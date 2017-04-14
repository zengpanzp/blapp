;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-check" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M375.666133 678.760533 196.3712 499.4656 136.605867 559.230933 375.666133 798.290133 887.938133 286.0192 828.1728 226.253867Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-gouwuche" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M882.509499 277.375332c-13.078877-17.029862-33.770128-29.980825-56.760748-29.980825l-572.302411 0-5.921873-45.067428c-4.325515-33.225729-32.791847-59.662845-69.218478-59.662845l-32.492018 0c-9.630335 0-17.438161 7.983835-17.438161 17.622356 0 9.639544 7.80885 17.622356 17.438161 17.622356l32.492018 0c14.407128 0 32.126698 8.15268 34.630728 27.396977l66.586534 509.547135c4.427846 33.974789 33.531698 55.18281 69.217455 55.18281l442.300568 0c9.639544 0 17.438161-7.480368 17.438161-17.118889 0-9.639544-7.79964-17.118889-17.438161-17.118889L348.740706 735.798089c-18.222013 0-32.467459-10.112312-34.630728-26.750247l-5.614881-42.733267 440.60188 0c32.476669 0 59.621912-17.790178 67.523883-47.489594l76.650751-283.098683C898.653177 315.560002 894.736984 293.28058 882.509499 277.375332zM859.586416 326.703807l-76.668147 283.718807c-3.848655 14.458293-17.114796 20.644179-33.821293 20.644179L303.864636 631.066793l-45.785789-348.427574 567.669904 0c12.07399 0 22.683628 7.003508 29.103852 15.364943C860.506369 305.360709 862.175381 316.979328 859.586416 326.703807zM411.625942 837.310064c0 20.974707-17.003256 37.97694-37.97694 37.97694s-37.97694-17.003256-37.97694-37.97694 17.003256-37.97694 37.97694-37.97694S411.625942 816.335357 411.625942 837.310064zM776.252453 837.310064c0 20.974707-17.003256 37.97694-37.97694 37.97694s-37.97694-17.003256-37.97694-37.97694 17.003256-37.97694 37.97694-37.97694S776.252453 816.335357 776.252453 837.310064z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-dropdown" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512.442 694.397l-398.869-398.866-79.791 79.791 478.662 478.606 478.633-478.606-79.788-79.791z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-dropup" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M511.558 329.603l398.869 398.866 79.791-79.791-478.663-478.606-478.633 478.606 79.788 79.791z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)
