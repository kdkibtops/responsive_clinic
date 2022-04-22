/* eslint-disable */

/*Global variable that takes care of sections ID*/
let IDCounter = 4;

/*function to create new section*/
function createNewSection() {
    const nameBox = document.getElementById('sectionName');
    const contentsBox = document.getElementById('sectionContents');
    const nameOfSection = nameBox.value;
    const contents = contentsBox.value;
    let sections = document.querySelectorAll('section');
    let counter = sections.length;
    let newSection = document.createElement('section');
    let newDiv = document.createElement('div');
    let newHeading = document.createElement('h2');
    let newpara1 = document.createElement('p');
    let newpara2 = document.createElement('p');

    let previousSection = sections[counter - 1];
    let thisSectionID = 'section' + IDCounter;
    IDCounter++;
    newSection.setAttribute('id', thisSectionID);
    if (nameOfSection !== '') {
        newSection.setAttribute('data-nav', nameOfSection);
        newHeading.textContent = nameOfSection;
    } else {
        newSection.setAttribute('data-nav', 'Section ' + (counter + 1));
        newHeading.textContent = 'My new section ' + (counter + 1);
    }
    newDiv.setAttribute('class', 'landing__container');
    if (contents !== '') {
        newpara1.textContent = contents;
        newpara2.textContent = contents;
    } else {
        newpara1.textContent = 'This paragraph was added by javascript dynamically, and this is paragraph number 1';
        newpara2.textContent = 'This paragraph was added by javascript dynamically, and this is paragraph number 2';
    }
    newDiv.appendChild(newHeading);
    newDiv.appendChild(newpara1);
    newDiv.appendChild(newpara2);
    newSection.appendChild(newDiv);
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'button');
    deleteButton.textContent = 'Delete!'
    deleteButton.setAttribute('onclick', 'deleteSection(' + thisSectionID + ')');
    newSection.appendChild(deleteButton)
    previousSection.insertAdjacentElement("afterend", newSection);
    updateNavigationBar();
    // newSection.scrollIntoView({behavior: "smooth"}); /* Can be used if the user wants to scroll down to the new created segment */
}

/*function to scroll viewport to the top of the page*/
function backToTop() {
    scrollTo(top)
}

/*function to delete the selected section by the user*/
function deleteSection(sectionID) {
    sectionID.remove();
    updateNavigationBar();
    backToTop();
}

/* build the nav bar function
   update the navigation bar after adding any new sections*/

function updateNavigationBar() {
    if (document.title === 'Maadi Intervention') {
        let counter = 0;
        let sections = document.querySelectorAll('section');
        const listMenu = document.getElementById('navbar__list');

        listMenu.innerHTML = '';
        for (let x of sections) {
            const navBarName = x.getAttribute('data-nav');
            const navBarID = x.getAttribute('ID');
            const listItem = document.createElement('li');
            listItem.setAttribute('class', 'navbar__menu li');
            listItem.classList.add('navbar__menu');
            listItem.classList.add('menu__link');
            listItem.setAttribute('id', 'tab_' + navBarID.split('n')[1]);
            listItem.innerHTML = navBarName;
            listMenu.appendChild(listItem);
            counter++;


        }
    }
}

/*detect if the section is in viewport, and if true, change the class to active class and its 
corresponidng tab in navigation tab to the new style else it removes active class, function 
runs with mouse scroll*/

function isActive(sectionID) {

    let activeClass = document.getElementById(sectionID);
    let activeClassHeadingOffset = activeClass.firstElementChild.firstElementChild.getBoundingClientRect().bottom;
    let activeClassHeadingStart = activeClass.firstElementChild.firstElementChild.getBoundingClientRect().y;
    let activeClassOffset = activeClass.getBoundingClientRect().y;
    let activeClasseOffsetEnd = window.innerHeight - activeClassOffset;
    let windowToHeadingBottom = (window.innerHeight - activeClassHeadingOffset) / window.innerHeight * 100;
    if (activeClassHeadingStart >= 0 && activeClassOffset >= 0 && activeClasseOffsetEnd > 0 && windowToHeadingBottom > 10) {
        activeClass.setAttribute('class', 'your-active-class');
        let activeTab = 'tab_' + activeClass.getAttribute('id').split('n')[1];
        document.getElementById(activeTab).style.backgroundColor = 'crimson';

    } else {
        if (activeClass.classList.contains('your-active-class')) {
            activeClass.classList.remove('your-active-class');
            let activeTab = 'tab_' + activeClass.getAttribute('id').split('n')[1];
            document.getElementById(activeTab).style.backgroundColor = '';
        }

    };
}


/*main functions to run when opening the page*/
updateNavigationBar();
backToTop();


/*Event Listeners*/

/* Event listeners*/
document.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    if (evtTarget.id === 'register_button' || evtTarget.id === 'register_nav') {
        window.location.href = '../resources/html/registeration.html';
    }
})
document.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    if (evtTarget.id === 'signIn_button' || evtTarget.id === 'signIn_nav') {
        window.location.href = '../resources/html/signInPage.html';
    }
})

// functions for buttons in index file
document.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    if (evtTarget.id === 'browsePatients') {
        window.location.href = '../html/browsePatients.html';
    }
})

document.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    if (evtTarget.id === 'newClinic') {
        window.location.href = '../html/newClinic.html';
    }
})

document.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    if (evtTarget.id === 'stats') {
        window.location.href = '../html/stats.html';
    }
})

document.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    if (evtTarget.id === 'clinicHistory') {
        window.location.href = '../html/clinicHistory.html';
    }
})

//end of functions for buttons in index file




/*Event listener to scrollToTopButton and runs backToTop()*/
document.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    if (evtTarget.id === 'scrollToTopButton') {
        backToTop();
    }
})

/*Add event listener to scroll to section upon clicking on the scroll bar */
document.addEventListener('click', function(evt) {
    const evtTarget = evt.target;

    if (evtTarget.nodeName === 'LI' && evtTarget.parentElement.id === 'navbar__list') {
        let targetID = evtTarget.getAttribute('id');
        let sectionNumber = targetID.split('_')[1];
        let selectedSection = document.getElementById('section' + sectionNumber);
        selectedSection.scrollIntoView({ behavior: "smooth" });
    }
})

/*Event listener to mousescroll, checks active section and runs isActive()*/
document.addEventListener('scroll', function() {
    let sections = document.querySelectorAll('section');

    for (let x of sections) {
        const theSection = x.getAttribute('id');
        isActive(theSection);
    }
})