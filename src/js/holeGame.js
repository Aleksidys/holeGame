let count = 0;
let failCount = -1;
let clickedOnTargetBin = false;
let failCounter; // Объявление failCounter глобально

window.addEventListener('load', function() {
    console.log('holejame загружен');

    let containerChildren = document.querySelectorAll('.container > *');
    failCounter = document.querySelector('.failCounter'); // Присвоение failCounter здесь

    let timeoutId;

    function startTimeout() {
        failCounter.innerText = `Fail Count: ${failCount}`;
        timeoutId = setTimeout(function() {
            resetTimeout();
        }, 1000);
    }

    function resetTimeout() {
        if (!clickedOnTargetBin) {
            failCount = failCount + 1;
            console.log(failCount);
            console.log('Failed to click on element with class "target"');
            if (failCount === 5) {
              alert("Игра завершена. Вы пропустили 5 гоблинов.");
            }
        } else {
            clickedOnTargetBin = false;
        }
        clearTimeout(timeoutId);
        startTimeout();
    }

    startTimeout();

    setInterval(function() {
        containerChildren.forEach(function(child) {
            if (!child.classList.contains('item')) {
                child.classList.add('item');
            }
        });

        containerChildren.forEach(function(item) {
            item.classList.remove('target');
        });

        let randomIndex = Math.floor(Math.random() * containerChildren.length);
        containerChildren[randomIndex].classList.remove('item');
        containerChildren[randomIndex].classList.add('target');
    }, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
    let counter = document.querySelector('.counter');
    let container = document.querySelector('.container');

    container.addEventListener('click', function(event) {
        let targetElement = event.target;

        if (targetElement.closest('.container') && targetElement.classList.contains('target')) {
            count = count + 1;
            console.log('Clicked on element with class "target');
            clickedOnTargetBin = true;

            counter.innerText = `Счет: ${count}`;

            targetElement.classList.remove("target");
            targetElement.classList.add("item");
        }
    });
});


