$(function() {
    'use strict';

    var view,
        min, max, offset, reference, pressed, xform,
        velocity, frame, timestamp, ticker,
        amplitude, target, timeConstant,
        count, overlay, snap;

    function xpos(e) {
        // touch event
        if (e.targetTouches && (e.targetTouches.length >= 1)) {
            return e.targetTouches[0].clientX;
        }

        // mouse event
        return e.clientX;
    }

    function tap(e) {
        pressed = true;
        reference = xpos(e);

        velocity = amplitude = 0;
        frame = offset;
        timestamp = Date.now();
        clearInterval(ticker);
        ticker = setInterval(track, 100);

        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function track() {
        var now, elapsed, delta, v;

        now = Date.now();
        elapsed = now - timestamp;
        timestamp = now;

        delta = offset - frame;
        frame = offset;

        max = view.scrollWidth - view.clientWidth;

        v = 1000 * delta / (1 + elapsed);
        velocity = 0.8 * v + 0.2 * velocity;
    }

    function drag(e) {
        var x, delta;
        if (pressed) {
            x = xpos(e);
            delta = reference - x;
            if (delta > 2 || delta < -2) {
                reference = x;
                scroll(offset + delta);
            }
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function release(e) {
        pressed = false;

        clearInterval(ticker);

        target = offset;
        if (velocity > 5 || velocity < -5) {
            amplitude = 1.5 * velocity;
            target = offset + amplitude;
        }
        target = Math.round(target / snap) * snap;
        amplitude = target - offset;
        timestamp = Date.now();
        requestAnimationFrame(autoScroll);

        e.preventDefault();
        e.stopPropagation();
        return false;
    }


    function scroll(x) {
        var container = $('#mainContainer');
        var currentScroll = container.scrollLeft();
        offset = x;
        container.scrollLeft(currentScroll + x);
    }

    function autoScroll() {
        var elapsed, delta;

        if (amplitude) {
            elapsed = Date.now() - timestamp;
            delta = -amplitude * Math.exp(-elapsed / timeConstant);
            if (delta > 5 || delta < -5) {
                scroll(target + delta);
                requestAnimationFrame(autoScroll);
            } else {
                scroll(target);
            }
        }
    }

    view = document.getElementById('mainContainer');

    if (typeof window.ontouchstart !== 'undefined') {
        view.addEventListener('touchstart', tap);
        view.addEventListener('touchmove', drag);
        view.addEventListener('touchend', release);
    }

    view.addEventListener('mousedown', tap);
    view.addEventListener('mousemove', drag);
    view.addEventListener('mouseup', release);


    max = view.scrollWidth - view.clientWidth;
    offset = min = 0;
    pressed = false;
    timeConstant = 325; // ms

    snap = parseInt(getComputedStyle(document.getElementsByClassName('order')[0]).width, 10);


});