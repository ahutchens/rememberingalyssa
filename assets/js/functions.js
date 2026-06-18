var clicked = false;

function getTimeZoneOffset(date, timeZone) {
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
    const parts = formatter.formatToParts(date).reduce(function (result, part) {
        if (part.type !== "literal") {
            result[part.type] = part.value;
        }

        return result;
    }, {});

    return Date.UTC(
        Number(parts.year),
        Number(parts.month) - 1,
        Number(parts.day),
        Number(parts.hour),
        Number(parts.minute),
        Number(parts.second)
    ) - date.getTime();
}

function createCutoffForTimeZone(year, month, day, hour, minute, timeZone) {
    const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
    const initialOffset = getTimeZoneOffset(new Date(utcGuess), timeZone);
    const initialTimestamp = utcGuess - initialOffset;
    const correctedOffset = getTimeZoneOffset(new Date(initialTimestamp), timeZone);

    if (correctedOffset === initialOffset) {
        return initialTimestamp;
    }

    return utcGuess - correctedOffset;
}

function createCentralCutoff(year, month, day, hour, minute) {
    return createCutoffForTimeZone(year, month, day, hour, minute, "America/Chicago");
}

function createCentralCutoffFromLocalTime(year, month, day, hour, minute, localTimeZone) {
    return createCutoffForTimeZone(
        year,
        month,
        day,
        hour,
        minute,
        localTimeZone || Intl.DateTimeFormat().resolvedOptions().timeZone
    );
}

$(document).ready(function () {
    const shirtsCutoff = createCentralCutoff(2026, 6, 22, 23, 59);
    const registrationCutoff = createCentralCutoff(2026, 6, 12, 22, 0);
    const shirtsExpired = Date.now() >= shirtsCutoff;
    // const shirtsExpired = false;
    const registrationExpired = Date.now() >= registrationCutoff;

    if (shirtsExpired) {
        $('.subdropdown a[href="shirt.html"]').hide();
    }

    if (registrationExpired) {
        $('.subdropdown a[href="alyssaride.html"]').hide();
        $('#eventregister a[href="registration.html"]').hide();
    }

    if (shirtsExpired && window.location.pathname.toLowerCase().endsWith("/shirt.html")) {
        $(".shirtcontent").html("<h1>Shirt sales are now closed.</h1>");
    }

    if (registrationExpired && window.location.pathname.toLowerCase().endsWith("/registration.html")) {
        $(".shirtcontent").html("<h1>Registration is now closed.</h1>");
    }

    $(".hamburger").click(function () {
        $(".hamburger").toggleClass("open");
        $(".main").toggleClass("mainopen");
    });
    $(".giving1").click(function () {
        $(".selection1").toggleClass('hide');
        $(".selection2, .selection3, .selection4").addClass('hide');
        $("#triangle-up1").toggleClass('hidet');
        $("#triangle-up2, #triangle-up3, #triangle-up4").addClass('hidet');
        if (!clicked) {
            clicked = true;
            setTimeout(function () { clicked = false; }, 1000);
        } else {
            return false;
        };
    });
    $(".giving2").click(function () {
        $(".selection2").toggleClass('hide');
        $(".selection1, .selection3, .selection4").addClass('hide');
        $("#triangle-up2").toggleClass('hidet');
        $("#triangle-up1, #triangle-up3, #triangle-up4").addClass('hidet');
        if (!clicked) {
            clicked = true;
            setTimeout(function () { clicked = false; }, 1000);
        } else {
            return false;
        };
    });
    $(".giving3").click(function () {
        $(".selection3").toggleClass('hide');
        $(".selection1, .selection2, .selection4").addClass('hide');
        $("#triangle-up3").toggleClass('hidet');
        $("#triangle-up1, #triangle-up2, #triangle-up4").addClass('hidet');
        if (!clicked) {
            clicked = true;
            setTimeout(function () { clicked = false; }, 1000);
        } else {
            return false;
        };
    });
    $(".giving4").click(function () {
        $(".selection4").toggleClass('hide');
        $(".selection1, .selection2, .selection3").addClass('hide');
        $("#triangle-up4").toggleClass('hidet');
        $("#triangle-up1, #triangle-up2, #triangle-up3").addClass('hidet');
        if (!clicked) {
            clicked = true;
            setTimeout(function () { clicked = false; }, 1000);
        } else {
            return false;
        };
    });
    $("#dropdown1").click(function () {
        $(".showelement").toggleClass("opensub");
        $(".showelement2").removeClass("opensub");
    });
    $("#dropdown2").click(function () {
        $(".showelement2").toggleClass("opensub");
        $(".showelement").removeClass("opensub");
    });
});
