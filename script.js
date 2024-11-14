// Données JSON des posts, conversations, et amis
const donnees = {
    posts: [
        { id: 1, user: "Hind", content: "Bonjour ! Mon premier post ici !", image: null, reactions: { like: 5, dislike: 2, love: 10 }, comments: [] },
        { id: 2, user: "Amine", content: "Une superbe photo de mes vacances !", image: "vacances.png", reactions: { like: 15, dislike: 1, love: 25 }, comments: [] },
        { id: 3, user: "Sara", content: "Visiter la Tour Eiffel, quel rêve !", image: "tour_eiffel.png", reactions: { like: 20, dislike: 0, love: 30 }, comments: [] },
        { id: 4, user: "Lucas", content: "Les promenades en montagne sont les meilleures !", image: "montagne.png", reactions: { like: 10, dislike: 1, love: 15 }, comments: [] },
        { id: 5, user: "Leïla", content: "Les soirées entre amis, inoubliables !", image: "soiree.png", reactions: { like: 18, dislike: 0, love: 22 }, comments: [] }
    ],
    conversations: [
        { id: 1, user: "Charlie", image: "charlie.png", lastMessage: "À bientôt !", messages: [{ timestamp: "2024-11-14 10:30", sender: "Moi", content: "Bonjour Charlie !" }, { timestamp: "2024-11-14 10:32", sender: "Charlie", content: "Salut ! Comment ça va ?" }] },
        { id: 2, user: "Rania", image: "rania.png", lastMessage: "On se parle demain.", messages: [{ timestamp: "2024-11-14 09:00", sender: "Rania", content: "Coucou ! T'as vu mon dernier post ?" }, { timestamp: "2024-11-14 09:05", sender: "Moi", content: "Oui, j'adore !" }] }
    ],
    amis: [
        { nom: "Alice Martin", image: "alice.png" },
        { nom: "Bob Dupont", image: "bob.png" },
        { nom: "Charlie Leroy", image: "charlie.png" },
        { nom: "Yasmine Morel", image: "yasmine.png" },
        { nom: "Karim Bensalem", image: "karim.png" }
    ]
};

// Affiche les posts du fil d'actualité
function afficherPosts() {
    const conteneurPosts = document.getElementById("posts-container");
    conteneurPosts.innerHTML = "";

    donnees.posts.forEach(post => {
        const elementPost = document.createElement("div");
        elementPost.className = "post";

        const utilisateur = document.createElement("h3");
        utilisateur.textContent = post.user;
        elementPost.appendChild(utilisateur);

        const contenu = document.createElement("p");
        contenu.textContent = post.content;
        elementPost.appendChild(contenu);

        if (post.image) {
            const image = document.createElement("img");
            image.src = post.image;
            image.alt = "Image du post";
            image.className = "post-image";
            elementPost.appendChild(image);
        }

        const reactions = document.createElement("div");
        reactions.className = "reactions";

        // Suivi des réactions de l'utilisateur
        const userReactions = { like: false, dislike: false, love: false };

        const likeButton = document.createElement("button");
        likeButton.className = "reaction-button";
        likeButton.innerHTML = `👍 ${post.reactions.like}`;
        likeButton.addEventListener("click", () => {
            if (!userReactions.like) {
                post.reactions.like++;
                likeButton.innerHTML = `👍 ${post.reactions.like}`;
                likeButton.classList.add("selected");
                userReactions.like = true;
            }
        });

        const dislikeButton = document.createElement("button");
        dislikeButton.className = "reaction-button";
        dislikeButton.innerHTML = `👎 ${post.reactions.dislike}`;
        dislikeButton.addEventListener("click", () => {
            if (!userReactions.dislike) {
                post.reactions.dislike++;
                dislikeButton.innerHTML = `👎 ${post.reactions.dislike}`;
                dislikeButton.classList.add("selected");
                userReactions.dislike = true;
            }
        });

        const loveButton = document.createElement("button");
        loveButton.className = "reaction-button";
        loveButton.innerHTML = `❤️ ${post.reactions.love}`;
        loveButton.addEventListener("click", () => {
            if (!userReactions.love) {
                post.reactions.love++;
                loveButton.innerHTML = `❤️ ${post.reactions.love}`;
                loveButton.classList.add("selected");
                userReactions.love = true;
            }
        });

        reactions.appendChild(likeButton);
        reactions.appendChild(dislikeButton);
        reactions.appendChild(loveButton);

        elementPost.appendChild(reactions);
        conteneurPosts.appendChild(elementPost);
    });
}

// Affiche la liste d'amis
function afficherAmis() {
    const conteneurAmis = document.getElementById("friends-container");
    conteneurAmis.innerHTML = "";

    donnees.amis.forEach(ami => {
        const amiElement = document.createElement("div");
        amiElement.className = "ami";

        const amiImage = document.createElement("img");
        amiImage.src = ami.image;
        amiImage.alt = ami.nom;
        amiImage.className = "ami-image";
        amiElement.appendChild(amiImage);

        const amiNom = document.createElement("p");
        amiNom.textContent = ami.nom;
        amiElement.appendChild(amiNom);

        conteneurAmis.appendChild(amiElement);
    });
}

// Affiche les conversations
function afficherConversations() {
    const conteneurConversations = document.getElementById("conversations-container");
    conteneurConversations.innerHTML = "";

    donnees.conversations.forEach(conversation => {
        const convElement = document.createElement("div");
        convElement.className = "conversation";

        const convImage = document.createElement("img");
        convImage.src = conversation.image;
        convImage.alt = conversation.user;
        convImage.className = "conv-image";
        convElement.appendChild(convImage);

        const utilisateur = document.createElement("h4");
        utilisateur.textContent = conversation.user;
        convElement.appendChild(utilisateur);

        const dernierMessage = document.createElement("p");
        dernierMessage.textContent = conversation.lastMessage;
        convElement.appendChild(dernierMessage);

        conteneurConversations.appendChild(convElement);
    });
}

// Navigation entre les sections
function afficherSection(sectionId) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? "block" : "none";
    });
}

// Écouteurs pour les liens de navigation
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (event) => {
        const sectionId = event.target.getAttribute("href").substring(1);
        afficherSection(sectionId);
        event.preventDefault();
    });
});

// Fonction pour basculer l'état de la barre latérale
document.getElementById("menu-toggle").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.toggle("collapsed");
    document.querySelector(".sidebar").classList.toggle("active"); // Toggle pour mobile
});


// Affichage initial
afficherSection("feed");
afficherPosts();
afficherAmis();
afficherConversations();
