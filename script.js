/* Shop page */
/* Filter button */
const FilterButtons = document.querySelectorAll(".filter-options button");
const FilterableCards = document.querySelectorAll(".items .card");

const FilterCards = e => {
        document.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        
        FilterableCards.forEach( card => {
                card.classList.add('hide');

                if(card.dataset.name === e.target.dataset.name || e.target.dataset.name === "all") {
                        card.classList.remove("hide")
                }
        });
};

FilterButtons.forEach(button => button.addEventListener("click", FilterCards));

