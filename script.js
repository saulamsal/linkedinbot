let leftContainerUL = document.querySelector('.jobs-search-results__list');
// currentUlLiPos = 1;
//get number of size of available results and convert it into Integer
let availableResults = document.querySelector('.jobs-search-results-list__title-heading small').innerText;
availableResults = parseInt(availableResults.replace(' results', '').replace(',', ''));
let compareCounter = 1;
let ApplicationSubmitted = 0;

let isProcessing = false;
// let currentJobPosting = document.querySelector(`.jobs-search-results__list li:nth-child(${currentUlLiPos}) div div`).getAttribute("data-job-id");



// for (let i = 0; i <= availableResults; i++) { 
function runLoop(currentCount) {

    isProcessing = true;

    sleep(2000).then(() => {

        let leftContainerULElementSingle = document.querySelector(`.jobs-search-results__list li:nth-child(${compareCounter}) div div`);
        
   
        if(leftContainerULElementSingle) {
            leftContainerULElementSingle.click();
        }
        else {
            loadMorefix();
            return;
        }
        //sleep 2 seconds

        sleep(2000).then(() => {

            let easyApplyButton = document.querySelector('.jobs-s-apply .jobs-apply-button--top-card button.jobs-apply-button');

            if (easyApplyButton) {

                easyApplyButton.click();

                sleep(2000).then(() => {

                    //dont follow the company on linkedIn
                    if (document.querySelector('footer .relative label')) {
                        document.querySelector('footer .relative label').click();
                    }


                    //  SLEEP

                    sleep(2000).then(() => {

                        let submitApplication = document.querySelector('[aria-label="Submit application"]');
                        //if no any next step is there
                        if (submitApplication) {
                            submitApplication.click();
                        } else {
                            // nextButton 
                            continueToNextStep();

                            sleep(2000).then(() => {

                                // reviewApplicationFunc();

                                sleep(2000).then(() => {

                                    //  let submitApplication = document.querySelector('[aria-label="Submit application"]');
                                    if (submitApplication) {
                                        if (document.querySelector('footer .relative label')) {
                                            document.querySelector('footer .relative label').click();
                                        }
                                        submitApplication.click();

                                    }
                                });
                            });

                        }
                    });
                    //  SLEEP


                });

            }


        });

    });

    // currentUlLiPos++;
    isProcessing = false;
}



function SubmitApp() {

    let submitApplication = document.querySelector('[aria-label="Submit application"]');

    //  let submitApplication = document.querySelector('[aria-label="Submit application"]');
    if (submitApplication) {


        if (document.querySelector('footer .relative label')) {
            document.querySelector('footer .relative label').click();
        }
        sleep(1000).then(() => {
            submitApplication.click();
            
            submitApplication.onclick() = function(){
                ApplicationSubmitted++; 
            }

        });

    }

}


function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function continueToNextStep() {

    sleep(1500).then(() => {
        //check if any option is Selectable [ignore for now]
        //   checkOptionalFillablePages();
        let nextButton = document.querySelector('[aria-label="Continue to next step"]');

        if (nextButton) {
            nextButton.click();
            continueToNextStep();


        }


    });


}




function reviewApplicationFunc() {

    //    sleep(1500).then(() => {

    let nextButton = document.querySelector('[aria-label="Review your application"]');
    if (nextButton) {
        if (document.querySelector('footer .relative label')) {
            document.querySelector('footer .relative label').click();
        }
        nextButton.click();
    }


    //   });

}

setInterval(function() {
    reviewApplicationFunc();
    SubmitApp();
}, 2000);



    //Run new application every 20 seconds

    function loadMorefix(){
           document.querySelector('.jobs-search-results').scrollTo(0,document.body.scrollHeight);
           sleep(2000).then(() => {
               clickLoadMoreButton();
           });
            
    }


    setInterval(function() {

        if(!isProcessing) {
if (compareCounter <= availableResults) {


    let comment = {
        "Application Submitted": ApplicationSubmitted,
        "before loop start compareCounter value": compareCounter
    }

    console.table(comment);

      let leftContainerULElementSingle = document.querySelector(`.jobs-search-results__list li:nth-child(${compareCounter}) div div`);
        
        //sleep 2 seconds
           sleep(2000).then(() => {

             if(!leftContainerULElementSingle){
                 
                 console.log(`Element with ${compareCounter} compareCounter value isn't clicked`);

          loadMorefix();
             return;
        }
        else {
            leftContainerULElementSingle.click();
            console.log(`Element with ${compareCounter } compareCounter value is clicked`);
                    runLoop(compareCounter);
                    compareCounter++;

        //                  sleep(2000).then(() => {


        //     let easyApplyButton = document.querySelector('.jobs-s-apply .jobs-apply-button--top-card button.jobs-apply-button');

        //     if (easyApplyButton) {
        // runLoop(compareCounter);
        //     }
           
        //    compareCounter++;

        //         });




        }
  });

   
           }
   
        }
    }, 20000);


      
    setInterval(function() {
           //click LoadMore Jobs button every 2 minute
    }, 120000);

function clickLoadMoreButton(){
    document.querySelector('.jobs-search-two-pane__load-more button').click();

}


function checkOptionalFillablePages() {

    //store as string for all pages functionNames
    let availableFillablePages = ['diversityPageRun'];

    availableFillablePages.forEach((page) => {
        //Wait 2 seconds for every fillable check to avoid BOT
        sleep(1500).then(() => {
            //envoking a function via string
            window[page]();
        });

    });



}