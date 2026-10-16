const navButtons =
    [...document.querySelectorAll('nav button')];

const pages =
    [...document.querySelectorAll('.page')];


navButtons.forEach(button => {

    button.addEventListener('click', () => {


        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');


        pages.forEach(page => {

            page.classList.toggle(
                'active',
                page.id === button.dataset.page
            );

        });


        history.replaceState(
            null,
            '',
            '#' + button.dataset.page
        );

    });

});


/* переключение тем */

const themeButton =
    document.getElementById('themeBtn');


themeButton.addEventListener(
    'click',
    () => {

        document.body.classList.toggle('dark');


        const isDark =
            document.body.classList.contains('dark');



        themeButton.textContent =
            isDark
                ? ' Светлая тема'
                : ' Тёмная тема';



        localStorage.setItem(
            'theme',
            isDark
                ? 'dark'
                : 'light'
        );

    }
);



if (
    localStorage.getItem('theme') === 'dark'
) {

    document.body.classList.add('dark');

    themeButton.textContent =
        ' Светлая тема';

}



const monthNames = [

    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'

];



let cursor =
    new Date(2026, 9, 1);




let selected = null;



function renderMonths() {

    const months =
        document.getElementById('months');

    months.innerHTML = '';


    monthNames.forEach(
        (month, index) => {

            const button =
                document.createElement('button');


            

            button.textContent =
                month.slice(0, 3);


            

            button.className =
                index === cursor.getMonth()
                    ? 'active'
                    : '';


            

            button.addEventListener(
                'click',
                () => {

                    cursor.setMonth(index);

                    renderCalendar();

                }
            );


            months.appendChild(button);

        }
    );

}



function renderCalendar() {

    const year =
        cursor.getFullYear();

    const month =
        cursor.getMonth();




    document.getElementById(
        'monthTitle'
    ).textContent =
        `${monthNames[month]} ${year}`;




    renderMonths();


    const days =
        document.getElementById('days');

    days.innerHTML = '';



    const firstDay =
        (
            new Date(
                year,
                month,
                1
            ).getDay() + 6
        ) % 7;


   

    const totalDays =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement('button');

        empty.className =
            'day empty';

        days.appendChild(empty);

    }




    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const button =
            document.createElement('button');


        button.className =
            'day';


        button.textContent =
            day;


        
        const dateKey =
            `${year}-${month + 1}-${day}`;


        

        if (selected === dateKey) {

            button.classList.add(
                'selected'
            );

        }


    

        button.addEventListener(
            'click',
            () => {

                selected =
                    dateKey;


                

                document
                    .querySelectorAll('.day')
                    .forEach(dayButton => {

                        dayButton.classList.remove(
                            'selected'
                        );

                    });


                

                button.classList.add(
                    'selected'
                );


                

                document.getElementById(
                    'chosen'
                ).textContent =
                    `Вы выбрали: ${day} ${monthNames[month]} ${year}.`;

            }
        );


        days.appendChild(button);

    }

}



document
    .getElementById('prev')
    .addEventListener(
        'click',
        () => {

            cursor.setMonth(
                cursor.getMonth() - 1
            );

            renderCalendar();

        }
    );



document
    .getElementById('next')
    .addEventListener(
        'click',
        () => {

            cursor.setMonth(
                cursor.getMonth() + 1
            );

            renderCalendar();

        }
    );



renderCalendar();


const hash =
    location.hash.slice(1);


if (
    ['address', 'booking', 'about']
        .includes(hash)
) {

    const button =
        document.querySelector(
            `nav button[data-page="${hash}"]`
        );


    if (button) {
        button.click();
    }

}