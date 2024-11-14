const donnees = {
    posts: [
        { id: 1, user: "Hind", content: "Bonjour ! Mon premier post ici !", image: null, reactions: { like: 5, dislike: 2, love: 10 }, comments: [] },
        { id: 2, user: "Amine", content: "Une superbe photo de mes vacances !", image: "vacances.png", reactions: { like: 15, dislike: 1, love: 25 }, comments: [] },
        { id: 3, user: "Sara", content: "Visiter la Tour Eiffel, quel rêve !", image: "tour_eiffel.png", reactions: { like: 20, dislike: 0, love: 30 }, comments: [] },
        { id: 4, user: "Lucas", content: "Les promenades en montagne sont les meilleures !", image: "montagne.png", reactions: { like: 10, dislike: 1, love: 15 }, comments: [] },
        { id: 5, user: "Leïla", content: "Les soirées entre amis, inoubliables !", image: "soiree.png", reactions: { like: 18, dislike: 0, love: 22 }, comments: [] }
    ],
    conversations: [
        {
            id: 1,
            user: "Arber",
            photo: "Arber.png",
            lastMessage: "À bientôt !",
            messages: [
                { timestamp: "2024-11-14 10:30", sender: "Moi", content: "Bonjour Arber !" },
                { timestamp: "2024-11-14 10:32", sender: "Arber", content: "Salut ! Comment ça va ?" }
            ]
        },
        {
            id: 2,
            user: "Alexandre",
            photo: "Alexandre.png",
            lastMessage: "On se parle demain.",
            messages: [
                { timestamp: "2024-11-14 09:00", sender: "Moi", content: "Coucou Alexandre, tout va bien ?" },
                { timestamp: "2024-11-14 09:05", sender: "Alexandre", content: "Oui, merci !" }
            ]
        }
    ],
    amis: [
        { nom: "Maryse Marceau", image: "Maryse.png" },
        { nom: "Alexandre Torrent", image: "Alexandre.png" },
        { nom: "Arber Savard", image: "Arber.png" },
        { nom: "Arienne Chandonnet", image: "Arienne.png" },
        { nom: "Karim Bensalem", image: "karim.png" }
    ]
};

function afficherPosts() {
    const conteneurPosts = document.getElementById("posts-container");
    conteneurPosts.innerHTML = "";

    donnees.posts.forEach(post => {
        const elementPost = document.createElement("div");
        elementPost.className = "post";

        elementPost.innerHTML = `
            <h3>${post.user}</h3>
            <p>${post.content}</p>
        `;

        if (post.image) {
            const image = document.createElement("img");
            image.src = post.image;
            image.alt = "Image du post";
            image.className = "post-image";
            image.addEventListener("click", () => afficherImagePleinEcran(post.image));
            elementPost.appendChild(image);
        }

        const reactions = document.createElement("div");
        reactions.className = "reactions";
        ["like", "dislike", "love"].forEach(type => {
            const bouton = creerBoutonReaction(type, post.reactions[type]);
            bouton.addEventListener("click", () => {
                post.reactions[type]++;
                afficherPosts();
            });
            reactions.appendChild(bouton);
        });
        elementPost.appendChild(reactions);

        const commentairesContainer = document.createElement("div");
        commentairesContainer.className = "commentaires-container";
        post.comments.forEach(comment => afficherCommentaire(comment, commentairesContainer));

        const formulaireCommentaire = document.createElement("form");
        formulaireCommentaire.className = "formulaire-commentaire";
        formulaireCommentaire.innerHTML = `
            <input type="text" placeholder="Ajouter un commentaire...">
            <button type="submit">⏎</button>
        `;
        formulaireCommentaire.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = formulaireCommentaire.querySelector("input");
            if (input.value.trim() !== "") {
                post.comments.push({ content: input.value.trim(), replies: [], likes: 0 });
                afficherPosts();
            }
        });

        elementPost.append(commentairesContainer, formulaireCommentaire);
        conteneurPosts.appendChild(elementPost);
    });
}

function afficherCommentaire(comment, container) {
    const commentaireElement = document.createElement("div");
    commentaireElement.className = "commentaire";
    commentaireElement.innerHTML = `<p>${comment.content}</p>`;

    const actions = document.createElement("div");
    actions.className = "actions-commentaire";
    const boutonLike = creerBoutonReaction("like", comment.likes);
    boutonLike.addEventListener("click", () => {
        comment.likes++;
        afficherPosts();
    });

    const boutonRepondre = document.createElement("button");
    boutonRepondre.textContent = "Répondre";
    boutonRepondre.addEventListener("click", () => {
        const reponseForm = document.createElement("form");
        reponseForm.innerHTML = `
            <input type="text" placeholder="Répondre...">
            <button type="submit">⏎</button>
        `;
        reponseForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = reponseForm.querySelector("input");
            if (input.value.trim() !== "") {
                comment.replies.push({ content: input.value.trim(), likes: 0 });
                afficherPosts();
            }
        });
        commentaireElement.appendChild(reponseForm);
    });

    actions.append(boutonLike, boutonRepondre);
    commentaireElement.appendChild(actions);
    container.appendChild(commentaireElement);
}

function creerBoutonReaction(type, compteur) {
    const bouton = document.createElement("button");
    bouton.className = "reaction-button";
    bouton.textContent = `${type === "like" ? "👍" : type === "dislike" ? "👎" : "❤️"} ${compteur}`;
    return bouton;
}

function afficherImagePleinEcran(imageSrc) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `<img src="${imageSrc}" class="modal-image">`;
    modal.addEventListener("click", () => document.body.removeChild(modal));
    document.body.appendChild(modal);
}

function afficherConversations() {
    const conteneur = document.getElementById("conversations-container");
    const backButton = document.getElementById("back-button");
    const detailsContainer = document.getElementById("message-details");

    conteneur.innerHTML = "";
    backButton.style.display = "none"; 
    detailsContainer.innerHTML = "";   

    donnees.conversations.forEach(conversation => {
        const convElement = document.createElement("div");
        convElement.className = "conversation";
        convElement.innerHTML = `
            <img src="${conversation.photo}" class="conv-image" alt="${conversation.user}">
            <h4>${conversation.user}</h4>
            <p>${conversation.lastMessage}</p>
        `;
        convElement.addEventListener("click", () => {
            afficherDetailsConversation(conversation);
            conteneur.style.display = "none";  
            backButton.style.display = "block";  
        });
        conteneur.appendChild(convElement);
    });
}

function afficherDetailsConversation(conversation) {
    const detailsContainer = document.getElementById("message-details");
    detailsContainer.innerHTML = `
        <div class="conversation-header">
            <img src="${conversation.photo}" class="conv-image" alt="${conversation.user}">
            <h4>${conversation.user}</h4>
        </div>
    `;

    const messagesContainer = document.createElement("div");
    messagesContainer.className = "messages-container";
    conversation.messages.forEach(msg => afficherMessage(msg, messagesContainer));
    detailsContainer.appendChild(messagesContainer);

    const formMessage = document.createElement("form");
    formMessage.className = "formulaire-message";
    formMessage.innerHTML = `
        <input type="text" placeholder="Écrire un message...">
        <button type="submit">⏎</button>
    `;
    formMessage.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = formMessage.querySelector("input");
        if (input.value.trim() !== "") {
            conversation.messages.push({
                timestamp: new Date().toLocaleString("fr-FR"),
                sender: "Moi",
                content: input.value.trim()
            });
            afficherDetailsConversation(conversation);
        }
    });
    detailsContainer.appendChild(formMessage);
}

function afficherMessage(message, container) {
    const msgElement = document.createElement("div");
    msgElement.className = "message";
    msgElement.innerHTML = `
        <p class="message-details">${message.sender} • ${message.timestamp}</p>
        <p class="message-content">${message.content}</p>
    `;
    container.appendChild(msgElement);
}

function retourConversations() {
    document.getElementById("conversations-container").style.display = "block"; 
    document.getElementById("message-details").innerHTML = "";  
    document.getElementById("back-button").style.display = "none";  
}

function afficherAmis() {
    const conteneurAmis = document.getElementById("friends-container");
    conteneurAmis.innerHTML = "";

    donnees.amis.forEach(ami => {
        const amiElement = document.createElement("div");
        amiElement.className = "ami";

        amiElement.innerHTML = `
            <img src="${ami.image}" alt="${ami.nom}" class="ami-image">
            <p>${ami.nom}</p>
            <a href="#messages" class="message-link">💬</a> <!-- Icone de lien vers la messagerie -->
        `;

        // Listener pour ouvrir la section de messagerie avec le nom du contact
        amiElement.querySelector(".message-link").addEventListener("click", (e) => {
            e.preventDefault();
            afficherSection("messages");
            afficherConversationPourAmi(ami.nom);
        });

        conteneurAmis.appendChild(amiElement);
    });
}

// Nouvelle fonction pour ouvrir une conversation avec l'ami sélectionné
function afficherConversationPourAmi(nomAmi) {
    const conversation = donnees.conversations.find(conv => conv.user === nomAmi);

    if (conversation) {
        afficherDetailsConversation(conversation);
    } else {
        const detailsContainer = document.getElementById("message-details");
        detailsContainer.innerHTML = `<p>Aucune conversation trouvée avec ${nomAmi}</p>`;
    }
}


function filtrerAmis() {
    const filtre = document.getElementById("friend-filter").value.toLowerCase();
    document.querySelectorAll("#friends-container .ami").forEach(ami => {
        const nom = ami.querySelector("p").textContent.toLowerCase();
        ami.style.display = nom.includes(filtre) ? "block" : "none";
    });
}

function activerDragAndDrop() {
    const container = document.getElementById("friends-container");
    let draggedItem = null;

    container.querySelectorAll(".ami").forEach(ami => {
        ami.draggable = true;
        ami.addEventListener("dragstart", () => {
            draggedItem = ami;
            ami.classList.add("dragging");
            setTimeout(() => ami.style.display = "none", 0);
        });

        ami.addEventListener("dragend", () => {
            ami.classList.remove("dragging");
            setTimeout(() => {
                ami.style.display = "block";
                draggedItem = null;
            }, 0);
        });

        ami.addEventListener("dragover", (e) => e.preventDefault());

        ami.addEventListener("drop", () => {
            if (draggedItem !== ami) {
                const amisList = Array.from(container.children);
                const draggedIndex = amisList.indexOf(draggedItem);
                const amiIndex = amisList.indexOf(ami);

                if (draggedIndex < amiIndex) {
                    container.insertBefore(draggedItem, ami.nextSibling);
                } else {
                    container.insertBefore(draggedItem, ami);
                }
            }
        });
    });
}

function afficherSection(sectionId) {
    document.querySelectorAll("main > section").forEach(section => {
        section.style.display = section.id === sectionId ? "block" : "none";
    });
}

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        afficherSection(event.target.getAttribute("href").substring(1));
    });
});

afficherSection("feed");
afficherPosts();
afficherAmis();
afficherConversations();
