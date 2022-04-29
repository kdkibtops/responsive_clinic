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
        for (x of sections) {
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


        };
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
updateHomePage();
updateNavigationBar();
backToTop();


/*Event Listeners*/

/* Create new section function when pressing the add new section button*/
document.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    if (evtTarget.id === 'addNewSection') {
        /* write code to create a form to be filled and then submitted*/
        const sectionName = document.getElementById('sectionName');
        const sectionContents = document.getElementById('sectionContents')
        createNewSection(sectionName, sectionContents);
        sectionName.value = '';
        sectionContents.value = '';
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


function updateHomePage() {
    const HTML_main = document.getElementById('main_div');
    HTML_main.innerHTML = `<header class="main__hero" style='margin-top:4%'>
        <h1 id="topElement">Maadi Intervention Clinic</h1>
        </header>
        <div id='navigationDiv' class='navigationDiv'>
        <div id='browsePatients' class='buttons'><span id='browsePatients' class='button-span'> Browse Patients</span> <img id='browsePatients' src="../icons/browse.png" class='icon-image' alt="BROWSE PATIENTS"></div>
        <div id='newClinic' class='buttons'><span id='newClinic' class='button-span'>Start new Clinic </span><img id='newClinic' src="../icons/add_new.png" class='icon-image' alt="NEW CLINIC"></div>
        <div id='stats' class='buttons'><span id='stats' class='button-span'>Statistics </span><img id='stats' src="../icons/stats.png" class='icon-image' alt="Statistics"></div>
        <div id='clinicHistory' class='buttons'><span id='clinicHistory' class='button-span'>Clinic History</span><img id='clinicHistory' src="../icons/clinicHistory.png" class='icon-image' alt="Statistics"></div>
        </div>
        <div>
        <br><br><br><br>
        <h3 style='margin-left:10%'> Add new event
            <h3>
        </div>
        <!-- added new form and button for the page to be interactive and user can add contents -->
        <div id="addContentDiv" class="landing__container">
        <form>
            <label for="sectionName">Event title:</label><br>
            <textarea type="text" id="sectionName" name="sectionName" class="blank_space"></textarea><br>
            <label for="content">Description:</label><br>
            <textarea id="sectionContents" class="blank_space"></textarea>
        </form>

        <button id="addNewSection" class="add button">Add New Event</button>
        </div>
        <!--  -->

        <div>
        <h2>News feed</h2>
        <section id="section1" data-nav="Section 1" class="your-active-class">
            <div class="landing__container">
                <h2>Section 1</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci
                    eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi,
                    aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed
                    euismod.
                </p>

                <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse
                    imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
            </div>
        </section>
        <section id="section2" data-nav="Section 2">
            <div class="landing__container">
                <h2>Section 2</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci
                    eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi,
                    aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed
                    euismod.
                </p>

                <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse
                    imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
            </div>
        </section>
        <section id="section3" data-nav="Section 3">
            <div class="landing__container">
                <h2>Section 3</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci
                    eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi,
                    aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed
                    euismod.
                </p>

                <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse
                    imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
            </div>
        </section>
        </div>`
}