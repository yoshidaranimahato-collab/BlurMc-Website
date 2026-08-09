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
/* =========================================
   SUPABASE SESSION / NAVBAR
========================================= */

const BLURMC_SUPABASE_URL =
    "https://uunmqbthiyyipgnjayry.supabase.co";

const BLURMC_SUPABASE_KEY =
    "sb_publishable_Z_Bal3Jr5D8NepOFge2quQ_qBsqJaWF";

let blurmcSupabase = null;

async function setupBlurMcAuth() {

    if (!window.supabase) return;

    blurmcSupabase =
        window.supabase.createClient(
            BLURMC_SUPABASE_URL,
            BLURMC_SUPABASE_KEY
        );

    const {
        data: {
            session
        }
    } = await blurmcSupabase.auth.getSession();

    updateBlurMcNavbar(session);

    blurmcSupabase.auth.onAuthStateChange(
        (_event, newSession) => {

            updateBlurMcNavbar(newSession);

        }
    );
}


async function updateBlurMcNavbar(session) {

    const navButtons =
        document.querySelector(".nav-buttons");

    if (!navButtons) return;

    if (!session) {

        navButtons.innerHTML = `
            <a href="login.html"
               class="login-btn">
                Login
            </a>

            <a href="register.html"
               class="register-btn">
                Register
            </a>
        `;

        return;
    }


    let username = "Player";


    try {

        const {
            data,
            error
        } = await blurmcSupabase
            .from("profiles")
            .select("username")
            .eq("id", session.user.id)
            .single();


        if (!error && data) {

            username = data.username;

        }

    } catch (error) {

        console.log(
            "Could not load username."
        );

    }


    navButtons.innerHTML = `

        <span class="logged-user">
            👤 ${escapeHTML(username)}
        </span>

        <button
            class="logout-btn"
            onclick="blurMcLogout()">
            Logout
        </button>

    `;

}


async function blurMcLogout() {

    if (!blurmcSupabase) return;

    await blurmcSupabase.auth.signOut();

    window.location.href =
        "index.html";

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* Start auth */

if (document.querySelector(".nav-buttons")) {

    const authScript =
        document.createElement("script");

    authScript.src =
        "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

    authScript.onload =
        setupBlurMcAuth;

    document.head.appendChild(authScript);

       }
