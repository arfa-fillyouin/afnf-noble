import Nanobar from 'nanobar';

export default function () {
    // Create the nanobar instance
    const nanobar = new Nanobar();

    // Timer for moving progress bar during ajax calls
    let timer = null;
    let current = 0;

    function clearTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function setTimer() {
        clearTimer();

        current = 0;
        timer = setInterval(() => {
            current += 3;
            if (current <= 100) {
                nanobar.go(current);
            } else {
                clearTimer();
            }
        }, 50);
    }

    // Attach global jquery handlers to listen for ajax start
    $(document).ajaxSend(() => {
        setTimer();
    });

    $(document).ajaxComplete(() => {
        nanobar.go(100);
        clearTimer();

        if ($('a.toggle-link.list').hasClass('active') && (!$('a.toggle-link.list').hasClass('default'))){
          $('a.toggle-link.list').trigger("click");
        } else if ($('a.toggle-link.grid').hasClass('active') && (!$('a.toggle-link.grid').hasClass('default'))) {
            $('a.toggle-link.grid').trigger("click");
        }

        // MAKE COMPARE TEXT CLICKABLE IN LIST VIEW
        $(".listItem-body label.button--small.listItem-button").on('click', function() {
          console.log('compare-area-clicked!');
          var checkBox = $(this).find("input[type='checkbox']");
          checkBox.prop("checked", !checkBox.prop("checked"));
        });
    });
}
