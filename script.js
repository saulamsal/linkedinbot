

let leftContainerUL = document.querySelector('.jobs-search-results__list');
// currentUlLiPos = 1;
//get number of size of available results and convert it into Integer
let availableResults = document.querySelector('.jobs-search-results-list__title-heading small').innerText;
availableResults = parseInt(availableResults.replace(' results','').replace(',',''));


// let currentJobPosting = document.querySelector(`.jobs-search-results__list li:nth-child(${currentUlLiPos}) div div`).getAttribute("data-job-id");



  // for (let i = 0; i <= availableResults; i++) { 
function runLoop(currentCount) {


sleep(2000).then(() => {

      let leftContainerULElementSingle = document.querySelector(`.jobs-search-results__list li:nth-child(${currentCount}) div div`);
    leftContainerULElementSingle.click();
  //sleep 2 seconds

  sleep(2000).then(() => {

let easyApplyButton = document.querySelector('.jobs-s-apply .jobs-apply-button--top-card button.jobs-apply-button');

  if(easyApplyButton){

    easyApplyButton.click();
    
      sleep(2000).then(() => {

//dont follow the company on linkedIn
       if(document.querySelector('footer .relative label')){
         document.querySelector('footer .relative label').click();
         }


        //  SLEEP
   
                     sleep(2000).then(() => {
    
              let submitApplication = document.querySelector('[aria-label="Submit application"]');
              //if no any next step is there
                          if(submitApplication){
                    submitApplication.click();
                          }
                          else {
                             // nextButton 
                          continueToNextStep();

                                           sleep(2000).then(() => {
                             reviewApplicationFunc();

                                   sleep(2000).then(() => {

                                                  //  let submitApplication = document.querySelector('[aria-label="Submit application"]');
                                         if(submitApplication){
                                                  if(document.querySelector('footer .relative label')){document.querySelector('footer .relative label').click();}
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
}



function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function continueToNextStep(){

          sleep(1500).then(() => {
              //check if any option is Selectable
              checkOptionalFillablePages();
                let nextButton = document.querySelector('[aria-label="Continue to next step"]');

                if(nextButton) {
                  nextButton.click();
                  continueToNextStep();
                }
                 
              });


}

function reviewApplicationFunc(){
       sleep(1500).then(() => {
           
                let nextButton = document.querySelector('[aria-label="Review your application"]');
                if(nextButton) {
                  nextButton.click();
                }
              });

}

runLoop(1);




function checkOptionalFillablePages(){

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



function diversityPageRun() {
    if(CheckdiversityObject.isDiversityPage) {
        alert("is Diversity Page");
    }

}



let diversityPage; 

    //this obj entries MUST return boolean
    let CheckdiversityObject = {
        isDiversityPage: document.querySelector('.t-16.t-bold').innerText == "Diversity", 
        hasGenderOption: document.querySelector('.jobs-easy-apply-form-section__grouping div label span.t-14').innerText == "Gender",

    }

    let DiversityOptionsText = {
        Gender: 'Gender',
        raceAndEthnicity:   'Race and ethnicity',
        VeteranStatus: 'Veteran Status',
        DisabilityStatus: 'Disability Status'

    }


let allPopUpInputs = document.querySelectorAll('.t-16.t-bold'); 
for (var i = 0; i < allPopUpInputs.length; ++i) {
   allPopUpInputs[i].classList.add('cf');
}



    let genderOption;
    let RaceAndEthnicityOption;



