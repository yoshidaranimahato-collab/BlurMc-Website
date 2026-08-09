/* =========================================
   BLURMC SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuButton = document.querySelector(".menu-btn");
    const navMenu = document.querySelector("#navMenu");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            if (navMenu.classList.contains("active")) {
                menuButton.textContent = "✕";
            } else {
                menuButton.textContent = "☰";
            }

        });

    }


    /* =====================================
       CLOSE MOBILE MENU AFTER CLICK
    ===================================== */

    const navLinks = document.querySelectorAll("#navMenu a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuButton) {
                menuButton.textContent = "☰";
            }

        });

    });


    /* =====================================
       FAKE PLAYER COUNTER
       Replace later with real API
    ===================================== */

    const playerElement = document.getElementById("players");

    if (playerElement) {

        let players = 0;

        const animatePlayers = () => {

            const target = 24;

            if (players < target) {

                players++;

                playerElement.textContent = players;

                setTimeout(animatePlayers, 35);

            }

        };

        animatePlayers();

    }


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".status-card, .feature-card, .features > div"
    );

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================
       BUTTON CLICK EFFECT
    ===================================== */

    const buttons = document.querySelectorAll(
        ".play-btn, .discord-btn, .discord-large"
    );

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            button.style.transform = "scale(0.97)";

            setTimeout(() => {

                button.style.transform = "";

            }, 120);

        });

    });

});


/* =========================================
   COPY SERVER IP
========================================= */

function copyIP() {

    const serverIP = "play.blurmc.net";

    navigator.clipboard.writeText(serverIP)
        .then(() => {

            const message =
                document.getElementById("copyMessage");

            if (message) {

                message.textContent =
                    "✓ Server IP copied: " + serverIP;

                setTimeout(() => {

                    message.textContent = "";

                }, 3000);

            }

        })
        .catch(() => {

            const message =
                document.getElementById("copyMessage");

            if (message) {

                message.textContent =
                    "Server IP: " + serverIP;

            }

        });

}


/* =========================================
   PAGE LOADER
========================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
