// Données JSON des posts, conversations, et amis
const donnees = {
    posts: [
        { id: 1, user: "Hind", content: "Bonjour ! Mon premier post ici !", image: null, reactions: { like: 0, dislike: 0, love: 0 }, comments: [] },
        { id: 2, user: "Amine", content: "Une superbe photo de mes vacances !", image: "Av.png", reactions: { like: 0, dislike: 0, love: 0 }, comments: [] },
        { id: 3, user: "Sara", content: "Visiter la Tour Eiffel, quel rêve !", image: "tour_eiffel.png", reactions: { like: 0, dislike: 0, love: 0 }, comments: [] },
        { id: 4, user: "Lucas", content: "Les promenades en montagne sont les meilleures !", image: "montagne.png", reactions: { like: 0, dislike: 0, love: 0 }, comments: [] },
        { id: 5, user: "Leïla", content: "Les soirées entre amis, inoubliables !", image: "soiree.png", reactions: { like: 0, dislike: 0, love: 0 }, comments: [] }
    ],
    conversations: [
        { id: 1, user: "Charlie", lastMessage: "À bientôt !", messages: [{ timestamp: "2024-11-14 10:30", sender: "Moi", content: "Bonjour Charlie !" }, { timestamp: "2024-11-14 10:32", sender: "Charlie", content: "Salut ! Comment ça va ?" }] },
        { id: 2, user: "Rania", lastMessage: "On se parle demain.", messages: [{ timestamp: "2024-11-14 09:00", sender: "Rania", content: "Coucou ! T'as vu mon dernier post ?" }, { timestamp: "2024-11-14 09:05", sender: "Moi", content: "Oui, j'adore !" }] }
    ],
    amis: [
        { nom: "Alice Martin" },
        { nom: "Bob Dupont" },
        { nom: "Charlie Leroy" },
        { nom: "Yasmine Morel" },
        { nom: "Karim Bensalem" }
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

        conteneurPosts.appendChild(elementPost);
    });
}

afficherPosts();
