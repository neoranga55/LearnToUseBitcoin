var demo_input_amount_glowing = false;
var demo_input_amount_glowing_on = false;
var demo_input_address_glowing = false;
var demo_input_address_glowing_on = false;
var demo_copy_address_button_glowing = false;
var demo_copy_address_button_glowing_on = false;

function updateDemoContent() {
  setupTouchLayouts()
  updateToolTips();
}

function moveOutDemoTransactionSection() { // Save demo transaction content if neccesary
  $(document).ready(function() {
    if ($('#transaction-demo').children().size() == 1) {
      $('#transaction-demo-placeholder').append($('#transference-demo'));
    }
  });
}

function moveInDemoTransactionSection() { // Restore demo transaction content if neccesary
  $(document).ready(function() {
    if ($('#transaction-demo-placeholder').children().size() == 1) {
      $('#transaction-demo').append($('#transference-demo'));
    }
  });
}

function loadDemoContent() {
  if ( ( $("#demo-content").hasClass('empty-content') || $("#demo-content").hasClass('normal-content') )
      && (getWindowsSize() == "small") ) { // Window is small
    $("#demo-content").addClass('small-content').removeClass('empty-content').removeClass('normal-content');
    moveOutDemoTransactionSection();
    $("#demo-content").load("/demo-small", function() {
      moveInDemoTransactionSection();
      updateDemoContent();
      registerDemoParsleyEvents();
    });
  } else if ( ( $("#demo-content").hasClass('empty-content') || $("#demo-content").hasClass('small-content') )
      && ( getWindowsSize() != "small" ) ) { // Window is medium/big
    $("#demo-content").addClass('normal-content').removeClass('empty-content').removeClass('small-content');
    moveOutDemoTransactionSection();
    $("#demo-content").load("/demo", function() {
      moveInDemoTransactionSection();
      updateDemoContent();
      registerDemoParsleyEvents();
    });
  }
}

function showDemoTransaction() {
  if ( $("#transference-demo").hasClass('available') &&
       $('#transference-demo').isBottomScrolledIntoView() &&
       ! $("#transference-demo").hasClass('enabled')) { // Only when demo transaction section is displayed
    $("#transference-demo").addClass('enabled');
    setTimeout(function() { // Show with a little delay
      $('#demo-shopping-cart-info').fadeIn(2000, function() {
        setTimeout(function() { // Show with a little delay
          $('#demo-shopping-cart-content').fadeIn('slow', function() {
            $('#demo-wallet-send-info').fadeIn(2000, function() {
              setTimeout(function() { // Show with a little delay
                $('#demo-wallet-send-content').fadeIn('slow');
                demo_input_amount_glowing = true;
                demo_input_address_glowing = true;
                demo_copy_address_button_glowing = true;
                startDemoFieldsGlowing();
              }, 1500);
            });
          });
        }, 1500);
      });
    }, 500);
  }
}

function showBottomElements() {
  if ( show_bottom_elements && $("#transference-demo").isBottomScrolledIntoView() ) { // Only when section end is visible
    setTimeout(function() { // Show with a little delay
      $('#get-bitcoins-section').fadeIn('slow');
      $('#use').fadeIn('slow');
      $('#myths').fadeIn('slow');
    }, 500);
  }
}

function startDemoFieldsGlowing() { // Change glow if enabled and call itself in loop
  if (demo_input_amount_glowing || demo_input_address_glowing || demo_copy_address_button_glowing) {
    if (demo_input_amount_glowing) {
      demo_input_amount_glowing_on = ! demo_input_amount_glowing_on;
      if (demo_input_amount_glowing_on && ( ! $('#demo-input-amount').parsley().isValid() ) ) {
        $('#demo-input-amount').css("box-shadow", "0px 0px 40px #FF5E5E");
      } else {
        $('#demo-input-amount').css("box-shadow", "0px 0px 10px #FFF");
      }
    }
    if (demo_input_address_glowing) {
      demo_input_address_glowing_on = ! demo_input_address_glowing_on;
      if (demo_input_address_glowing_on && ( ! $('#demo-pay-to-address-input').parsley().isValid() ) ) {
        $('#demo-pay-to-address-input').css("box-shadow", "0px 0px 40px #FF5E5E");
      } else {
        $('#demo-pay-to-address-input').css("box-shadow", "0px 0px 10px #FFF");
      }
    }
    if (demo_copy_address_button_glowing) {
      demo_copy_address_button_glowing_on = ! demo_copy_address_button_glowing_on;
      if (demo_copy_address_button_glowing_on) {
        $('#copy-demo-button').css("box-shadow", "0px 0px 50px #EA0000");
      } else {
        $('#copy-demo-button').css("box-shadow", "0px 0px 10px #FFF");
      }
    }
    setTimeout(function() { // Show with a little delay
      startDemoFieldsGlowing();
    }, 1800);
  } else {
    $('#demo-input-amount').css("box-shadow", "0px 0px 0px #FFF");
    $('#demo-pay-to-address-input').css("box-shadow", "0px 0px 0px #FFF");
    $('#copy-demo-button').css("box-shadow", "0px 0px 0px #FFF");
  }
}

function fillDemoInputAmount(scope) {
  $('#demo-input-amount').val('0.1');
  if (typeof scope === 'undefined') {
    console.log('without scope');
    $('#demo-input-amount').scope().$apply(function() { // Update AngularJS model
      $('#demo-input-amount').scope().input_amount = $('#demo-input-amount').val();
    });
  } else { // Calling from AngularJS scope
    console.log('WITH scope');
    scope.input_amount = $('#demo-input-amount').val();
  }
}

function copyDemoPayToAddres() {
  $("#demo-pay-to-address-input").val($("#demo-pay-to-address").text());
}

function registerDemoParsleyEvents() {
  // Fix automatically commas introduced in the field and replace by dots
  $('#demo-input-amount').parsley().subscribe('parsley:field:validate', function() {
    // Fix when it's not valid and contains commas
    var current_value = $('#demo-input-amount').val();
    if ((! $('#demo-input-amount').parsley().isValid()) &&
       ( current_value.indexOf(",") != -1 ) ) {
      var res = current_value.replace(",",".");
      $('#demo-input-amount').val(res);
      $('#demo-input-amount').parsley().validate();
    }
  });
}

function enable_bottom_sections_after_demo() {
  $('#show-blockchain-section').fadeIn('slow');
  show_bottom_elements = true; // Enable showing when scrolling
  $("#mining-content").load("/mining");
  $("#mining-POW-content").load("/mining-POW");
}