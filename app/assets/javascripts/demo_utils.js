
function updateDemoContent() {
  updateToolTips();
}

function moveOutDemoTransactionSection() { // Save demo transaction content if neccesary
  $(document).ready(function() {
    if ($('#transactionDemo').children().size() == 1) {
      $('#transactionDemoPlaceholder').append($('#transference-demo'));
    }
  });
}

function moveInDemoTransactionSection() { // Restore demo transaction content if neccesary
  $(document).ready(function() {
    if ($('#transactionDemoPlaceholder').children().size() == 1) {
      $('#transactionDemo').append($('#transference-demo'));
    }
  });
}

function loadDemoContent() {
  if ( ( $("#demo-content").hasClass('empty-content') || $("#demo-content").hasClass('normal-content') )
      && isSmallScreen() ) { // Window is small
    $("#demo-content").addClass('small-content').removeClass('empty-content').removeClass('normal-content');
    moveOutDemoTransactionSection();
    $("#demo-content").load("/demo-small", function() {
      updateDemoContent();
    });
  } else if ( ( $("#demo-content").hasClass('empty-content') || $("#demo-content").hasClass('small-content') )
      && ( ! isSmallScreen() ) ) { // Window is medium/big
    $("#demo-content").addClass('normal-content').removeClass('empty-content').removeClass('small-content');
    $("#demo-content").load("/demo", function() {
      moveInDemoTransactionSection();
      updateDemoContent();
    });
  }
}

function showDemoTransaction() {
  if ( $("#transference-demo").hasClass('available') &&
       $('#transference-demo').isBottomScrolledIntoView() ) { // Only when demo transaction section is displayed
    setTimeout(function() { // Show with a little delay
      $('#demo-shopping-cart-info').fadeIn(2000, function() {
        setTimeout(function() { // Show with a little delay
          $('#demo-shopping-cart-content').fadeIn('slow', function() {
            $('#demo-wallet-send-info').fadeIn(2000, function() {
              setTimeout(function() { // Show with a little delay
                $('#demo-wallet-send-content').fadeIn('slow');
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