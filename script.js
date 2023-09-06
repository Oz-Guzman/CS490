const form = document.getElementById('assessment-form');
const output = document.getElementById('output');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const photoInput = document.getElementById('photo-upload');
    const annotationInput = document.getElementById('annotation');

    // This is just to simulate a server response
    const assessmentData = {
        photo: photoInput.files[0].name,
        annotation: annotationInput.value
    };

    const response = `
        <p>Assessment submitted successfully:</p>
        <p><strong>Photo:</strong> ${assessmentData.photo}</p>
        <p><strong>Annotation:</strong> ${assessmentData.annotation}</p>
    `;

    output.innerHTML = response;

    const sameAddressCheckbox = document.getElementById('same-address');
    const affectedAddressContainer = document.getElementById('affected-address-container');

    sameAddressCheckbox.addEventListener('change', function() {
        if (this.checked) {
            affectedAddressContainer.style.display = 'none';
        } else {
            affectedAddressContainer.style.display = 'block';
        }
    });
});

!(function(d){
    // Variables to target our base class, get carousel items, count how many carousel items there are, set the slide to 0 (which is the number that tells us the frame we're on), and set motion to true which disables interactivity.
    var itemClassName = "carousel__photo";
    items = d.getElementsByClassName(itemClassName),
        totalItems = items.length,
        slide = 0,
        moving = true;

    // To initialize the carousel we'll want to update the DOM with our own classes
    function setInitialClasses() {

        // Target the last, initial, and next items and give them the relevant class.
        // This assumes there are three or more items.
        items[totalItems - 1].classList.add("prev");
        items[0].classList.add("active");
        items[1].classList.add("next");
    }

    // Set click events to navigation buttons

    function setEventListeners() {
        var next = d.getElementsByClassName('carousel__button--next')[0],
            prev = d.getElementsByClassName('carousel__button--prev')[0];

        next.addEventListener('click', moveNext);
        prev.addEventListener('click', movePrev);
    }

    // Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
    function disableInteraction() {
        moving = true;

        setTimeout(function(){
            moving = false
        }, 500);
    }

    function moveCarouselTo(slide) {

        // Check if carousel is moving; if not, allow interaction
        if(!moving) {

            // Temporarily disable interactivity
            disableInteraction();

            // Preemptively set variables for the current next and previous slide, as well as the potential next or previous slide.
            var newPrevious = slide - 1,
                newNext = slide + 1,
                oldPrevious = slide - 2,
                oldNext = slide + 2;

            // Test if carousel has more than three items
            if ((totalItems - 1) > 3) {

                // Checks if the new potential slide is out of bounds and sets slide numbers
                if (newPrevious <= 0) {
                    oldPrevious = (totalItems - 1);
                } else if (newNext >= (totalItems - 1)){
                    oldNext = 0;
                }

                // Check if the current slide is at the beginning or end and sets slide numbers
                if (slide === 0) {
                    newPrevious = (totalItems - 1);
                    oldPrevious = (totalItems - 2);
                    oldNext = (slide + 1);
                } else if (slide === (totalItems - 1)) {
                    newPrevious = (slide - 1);
                    newNext = 0;
                    oldNext = 1;
                }

                // Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.

                // Based on the current slide, reset to default classes.
                items[oldPrevious].className = itemClassName;
                items[oldNext].className = itemClassName;

                // Add the new classes
                items[newPrevious].className = itemClassName + " prev";
                items[slide].className = itemClassName + " active";
                items[newNext].className = itemClassName + " next";
            }
        }
    }

    // Next navigation handler
    function moveNext() {

        // Check if moving
        if (!moving) {

            // If it's the last slide, reset to 0; otherwise, +1
            if (slide === (totalItems - 1)) {
                slide = 0;
            } else {
                slide++;
            }

            // Move carousel to the updated slide
            moveCarouselTo(slide);
        }
    }

    // Previous navigation handler
    function movePrev() {

        // Check if moving
        if (!moving) {

            // If it's the first slide, set as the last slide; otherwise, -1
            if (slide === 0) {
                slide = (totalItems - 1);
            } else {
                slide--;
            }

            // Move carousel to the updated slide
            moveCarouselTo(slide);
        }
    }

    // Initialize carousel
    function initCarousel() {
        setInitialClasses();
        setEventListeners();

        // Set moving to false now that the carousel is ready
        moving = false;
    }

    // Call the initialization function to set up the carousel
    initCarousel();

}(document));
