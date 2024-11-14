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
        {
            id: 1,
            user: "Alice",
            photo: "alice.png",
            lastMessage: "À bientôt !",
            messages: [
                { timestamp: "2024-11-14 10:30", sender: "Moi", content: "Bonjour Alice !" },
                { timestamp: "2024-11-14 10:32", sender: "Alice", content: "Salut ! Comment ça va ?" }
            ]
        },
        {
            id: 2,
            user: "Bob",
            photo: "bob.png",
            lastMessage: "On se parle demain.",
            messages: [
                { timestamp: "2024-11-14 09:00", sender: "Moi", content: "Coucou Bob, tout va bien ?" },
                { timestamp: "2024-11-14 09:05", sender: "Bob", content: "Oui, merci !" }
            ]
        }
    ],
    amis: [
        { nom: "Alice Martin", image: "alice.png" },
        { nom: "Bob Dupont", image: "bob.png" },
        { nom: "Charlie Leroy", image: "charlie.png" },
        { nom: "Yasmine Morel", image: "yasmine.png" },
        { nom: "Karim Bensalem", image: "karim.png" }
    ]
};

// Affiche les posts du fil d'actualité avec possibilité de commenter
function afficherPosts() {
    const conteneurPosts = document.getElementById("posts-container");
    conteneurPosts.innerHTML = "";

    donnees.posts.forEach(post => {
        const elementPost = document.createElement("div");
        elementPost.className = "post";

        // Nom de l'utilisateur
        const utilisateur = document.createElement("h3");
        utilisateur.textContent = post.user;
        elementPost.appendChild(utilisateur);

        // Contenu du post
        const contenu = document.createElement("p");
        contenu.textContent = post.content;
        elementPost.appendChild(contenu);

        // Affichage de l'image en plein écran au clic
        if (post.image) {
            const image = document.createElement("img");
            image.src = post.image;
            image.alt = "Image du post";
            image.className = "post-image";
            image.addEventListener("click", () => afficherImagePleinEcran(post.image));
            elementPost.appendChild(image);
        }

        // Section des réactions
        const reactions = document.createElement("div");
        reactions.className = "reactions";
        const likeButton = creerBoutonReaction("👍", post.reactions.like);
        const dislikeButton = creerBoutonReaction("👎", post.reactions.dislike);
        const loveButton = creerBoutonReaction("❤️", post.reactions.love);
        reactions.append(likeButton, dislikeButton, loveButton);
        elementPost.appendChild(reactions);

        // Section des commentaires
        const commentairesContainer = document.createElement("div");
        commentairesContainer.className = "commentaires-container";
        post.comments.forEach(comment => afficherCommentaire(comment, commentairesContainer));

        // Formulaire pour ajouter un commentaire avec l'icône "Entrée"
        const formulaireCommentaire = document.createElement("form");
        formulaireCommentaire.className = "formulaire-commentaire";
        const inputCommentaire = document.createElement("input");
        inputCommentaire.type = "text";
        inputCommentaire.placeholder = "Ajouter un commentaire...";
        const boutonCommentaire = document.createElement("button");
        boutonCommentaire.type = "submit";
        boutonCommentaire.innerHTML = "⏎"; // Icône d'entrée pour commenter
        formulaireCommentaire.append(inputCommentaire, boutonCommentaire);

        // Ajouter un commentaire au post
        formulaireCommentaire.addEventListener("submit", (e) => {
            e.preventDefault();
            if (inputCommentaire.value.trim() !== "") {
                post.comments.push({ content: inputCommentaire.value.trim(), replies: [], likes: 0 });
                afficherPosts(); // Rafraîchir les posts
            }
            inputCommentaire.value = "";
        });

        elementPost.appendChild(commentairesContainer);
        elementPost.appendChild(formulaireCommentaire);
        conteneurPosts.appendChild(elementPost);
    });
}

// Fonction pour afficher un commentaire et gérer les boutons "Like" et "Répondre"
function afficherCommentaire(comment, container) {
    const commentaireElement = document.createElement("div");
    commentaireElement.className = "commentaire";

    const texteCommentaire = document.createElement("p");
    texteCommentaire.textContent = comment.content;
    commentaireElement.appendChild(texteCommentaire);

    // Boutons Like et Répondre pour le commentaire
    const boutonLikeCommentaire = document.createElement("button");
    boutonLikeCommentaire.className = "comment-like";
    boutonLikeCommentaire.textContent = `👍 ${comment.likes}`;
    boutonLikeCommentaire.addEventListener("click", () => {
        comment.likes++;
        afficherPosts(); // Rafraîchir les posts
    });

    const boutonRepondreCommentaire = document.createElement("button");
    boutonRepondreCommentaire.className = "comment-reply";
    boutonRepondreCommentaire.textContent = "Répondre";
    boutonRepondreCommentaire.addEventListener("click", () => {
        const inputReponse = document.createElement("input");
        inputReponse.type = "text";
        inputReponse.placeholder = "Répondre...";
        const boutonEnvoyerReponse = document.createElement("button");
        boutonEnvoyerReponse.textContent = "⏎"; // Icône d'entrée pour envoyer la réponse

        const reponseFormulaire = document.createElement("form");
        reponseFormulaire.className = "formulaire-reponse";
        reponseFormulaire.append(inputReponse, boutonEnvoyerReponse);

        commentaireElement.appendChild(reponseFormulaire);

        // Ajout de la réponse
        reponseFormulaire.addEventListener("submit", (e) => {
            e.preventDefault();
            if (inputReponse.value.trim() !== "") {
                comment.replies.push({ content: inputReponse.value.trim(), likes: 0 });
                afficherPosts(); // Rafraîchir les posts
            }
        });
    });

    // Conteneur pour les actions de commentaire
    const actionsCommentaire = document.createElement("div");
    actionsCommentaire.className = "actions-commentaire";
    actionsCommentaire.append(boutonLikeCommentaire, boutonRepondreCommentaire);
    commentaireElement.appendChild(actionsCommentaire);

    // Affichage des réponses
    const reponsesContainer = document.createElement("div");
    reponsesContainer.className = "reponses-container";
    comment.replies.forEach(reply => {
        const reponseElement = document.createElement("p");
        reponseElement.className = "reponse";
        reponseElement.textContent = reply.content;
        reponsesContainer.appendChild(reponseElement);
    });
    commentaireElement.appendChild(reponsesContainer);

    container.appendChild(commentaireElement);
}


// Crée un bouton de réaction avec l'icône et le compteur
function creerBoutonReaction(emoji, compteur) {
    const bouton = document.createElement("button");
    bouton.className = "reaction-button";
    bouton.textContent = `${emoji} ${compteur}`;
    return bouton;
}

// Affiche une image en plein écran
function afficherImagePleinEcran(imageSrc) {
    const modal = document.createElement("div");
    modal.className = "modal";

    const image = document.createElement("img");
    image.src = imageSrc;
    image.className = "modal-image";

    // Fermer la modal en cliquant dessus
    modal.addEventListener("click", () => {
        document.body.removeChild(modal);
    });

    modal.appendChild(image);
    document.body.appendChild(modal);
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

// Affiche la liste des conversations et cache le bouton de retour
function afficherConversations() {
    const conteneurConversations = document.getElementById("conversations-container");
    const backButton = document.getElementById("back-button");
    const detailsContainer = document.getElementById("message-details");

    conteneurConversations.innerHTML = "";
    backButton.style.display = "none";  // Cacher le bouton de retour lors de l'affichage de la liste
    detailsContainer.innerHTML = "";  // Vider les détails de la conversation

    donnees.conversations.forEach(conversation => {
        const convElement = document.createElement("div");
        convElement.className = "conversation";
        
        // Photo de profil
        const convPhoto = document.createElement("img");
        convPhoto.src = conversation.photo;
        convPhoto.alt = conversation.user;
        convPhoto.className = "conv-image";
        convElement.appendChild(convPhoto);

        // Nom de l'utilisateur
        const utilisateur = document.createElement("h4");
        utilisateur.textContent = conversation.user;
        convElement.appendChild(utilisateur);

        // Dernier message
        const dernierMessage = document.createElement("p");
        dernierMessage.textContent = conversation.lastMessage;
        convElement.appendChild(dernierMessage);

        // Ouvrir les détails de la conversation lors du clic
        convElement.addEventListener("click", () => {
            afficherDetailsConversation(conversation);
            conteneurConversations.style.display = "none";  // Cacher la liste des conversations
            backButton.style.display = "block";  // Afficher le bouton de retour
        });
        
        conteneurConversations.appendChild(convElement);
    });
}

// Affiche les détails de la conversation et active le bouton de retour
function afficherDetailsConversation(conversation) {
    const detailsContainer = document.getElementById("message-details");
    detailsContainer.innerHTML = "";

    // En-tête de la conversation
    const header = document.createElement("div");
    header.className = "conversation-header";
    const photo = document.createElement("img");
    photo.src = conversation.photo;
    photo.alt = conversation.user;
    photo.className = "conv-image";
    const nomUtilisateur = document.createElement("h4");
    nomUtilisateur.textContent = conversation.user;

    header.appendChild(photo);
    header.appendChild(nomUtilisateur);
    detailsContainer.appendChild(header);

    // Affiche chaque message
    const messagesContainer = document.createElement("div");
    messagesContainer.className = "messages-container";
    conversation.messages.forEach(msg => afficherMessage(msg, messagesContainer));
    detailsContainer.appendChild(messagesContainer);

    // Formulaire pour ajouter un message
    const formMessage = document.createElement("form");
    formMessage.className = "formulaire-message";
    const inputMessage = document.createElement("input");
    inputMessage.type = "text";
    inputMessage.placeholder = "Écrire un message...";
    const boutonEnvoyer = document.createElement("button");
    boutonEnvoyer.type = "submit";
    boutonEnvoyer.textContent = "⏎";  // Icône d'entrée

    formMessage.append(inputMessage, boutonEnvoyer);

    // Ajout du nouveau message
    formMessage.addEventListener("submit", (e) => {
        e.preventDefault();
        if (inputMessage.value.trim() !== "") {
            const newMessage = {
                timestamp: new Date().toLocaleString("fr-FR"),
                sender: "Moi",
                content: inputMessage.value.trim()
            };
            conversation.messages.push(newMessage);
            afficherDetailsConversation(conversation);  // Rafraîchir la vue de la conversation
            inputMessage.value = "";
        }
    });

    detailsContainer.appendChild(formMessage);
}

// Fonction pour revenir à la liste des conversations
function retourConversations() {
    document.getElementById("conversations-container").style.display = "block";  // Afficher la liste des conversations
    document.getElementById("message-details").innerHTML = "";  // Vider les détails de la conversation
    document.getElementById("back-button").style.display = "none";  // Cacher le bouton de retour
}


// Affiche un message individuel
function afficherMessage(message, container) {
    const msgElement = document.createElement("div");
    msgElement.className = "message";

    // Horodatage et expéditeur
    const details = document.createElement("p");
    details.className = "message-details";
    details.textContent = `${message.sender} • ${message.timestamp}`;

    // Contenu du message
    const content = document.createElement("p");
    content.className = "message-content";
    content.textContent = message.content;

    msgElement.appendChild(details);
    msgElement.appendChild(content);
    container.appendChild(msgElement);
}

// Retour à la liste des conversations
function retourConversations() {
    document.getElementById("conversations-container").style.display = "block";
    document.getElementById("message-details").innerHTML = ""; // Vider les détails de la conversation
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
