function generateRandomUser(id) {
    const names = [
      "José Santos",
      "Maria Santos",
      "João Silva",
      "Ana Pereira",
      "Carlos Costa",
      "Lucas Souza",
      "Fernanda Alves",
      "Paula Ferreira",
      "Bruno Barbosa",
      "Mariana Lima",
    ];
    const emails = [
      "jose@gmail.com",
      "marias11@gmail.com",
      "j113@gmail.com",
      "ana@gmail.com",
      "carlos@gmail.com",
      "lucas@gmail.com",
      "fernanda@gmail.com",
      "paula@gmail.com",
      "bruno@gmail.com",
      "mariana@gmail.com",
    ];
    const avatars = [
      "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png",
      "https://cdn.pixabay.com/photo/2017/03/01/22/18/avatar-2109804_1280.png",
      "https://cdn.pixabay.com/photo/2016/08/28/13/12/secondlife-1625903_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/03/31/20/27/avatar-1295773_1280.png",
      "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png",
      "https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png",
      "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_1280.png",
      "https://cdn.pixabay.com/photo/2016/11/01/21/11/avatar-1789663_1280.png",
      "https://cdn.pixabay.com/photo/2016/09/01/08/25/smiley-1635464_1280.png",
      "https://cdn.pixabay.com/photo/2016/12/13/16/17/dancer-1904467_1280.png",
    ];
  
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomAvatarIndex = Math.floor(Math.random() * avatars.length);
  
    return {
      id,
      name: names[randomIndex],
      email: emails[randomIndex],
      avatarUrl: avatars[randomAvatarIndex],
    };
  }
  
  const numberOfUsers = 30;
  const usersRandom = Array.from({ length: numberOfUsers }, (_, i) =>
    generateRandomUser(i + 1)
  );
  
  export default usersRandom;

// function generateRandomEvent(id) {
//     const names = [
//       "Festival de Música",
//       "Feira de Artesanato",
//       "Maratona de Programação",
//       "Workshop de Fotografia",
//       "Conferência de Tecnologia",
//       "Exposição de Arte",
//       "Curso de Yoga",
//       "Encontro de Escritores",
//       "Festa de Aniversário",
//       "Jantar de Gala",
//     ];
//     const descriptions = [
//       "Um festival com as melhores bandas locais.",
//       "Artesanato local em uma feira especial.",
//       "Desafie-se em uma maratona de codificação.",
//       "Aprenda técnicas de fotografia com profissionais.",
//       "Conferências sobre as últimas tendências em tecnologia.",
//       "Exposição de arte contemporânea.",
//       "Aprenda yoga com instrutores experientes.",
//       "Encontro para escritores compartilharem suas obras.",
//       "Celebre com amigos em um ambiente festivo.",
//       "Jantar elegante com pratos gourmet.",
//     ];
//     const imageUrls = [
//       "https://example.com/event1.jpg",
//       "https://example.com/event2.jpg",
//       "https://example.com/event3.jpg",
//       "https://example.com/event4.jpg",
//       "https://example.com/event5.jpg",
//       "https://example.com/event6.jpg",
//       "https://example.com/event7.jpg",
//       "https://example.com/event8.jpg",
//       "https://example.com/event9.jpg",
//       "https://example.com/event10.jpg",
//     ];
  
//     const randomIndex = Math.floor(Math.random() * names.length);
  
//     return {
//       id,
//       name: names[randomIndex],
//       description: descriptions[randomIndex],
//       imageUrl: imageUrls[randomIndex],
//     };
//   }
  
//   const numberOfEvents = 10;
//   const eventsRandom = Array.from({ length: numberOfEvents }, (_, i) =>
//     generateRandomEvent(i + 1)
//   );
  
//   export default eventsRandom;