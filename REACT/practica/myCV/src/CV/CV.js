import image from "../assets/WhatsApp Image 2023-12-11 at 13.58.03.jpeg";
import image2 from "../assets/Captura de pantalla 2024-06-20 a las 11.44.28.png";
import image3 from "../assets/Captura de pantalla 2024-06-20 a las 11.46.49.png";

export const CV = {
    hero: {
      name: "Sandra",
      surname: "Ropero",
      city: "Algeciras / Cádiz",
      email: "sroperodri@gmail.com",
      birthDate: "01/10/1987",
      phone: "675028030",
      image: image,
      gitHub: "https://github.com/sarodri",
      linkedin: "https://www.linkedin.com/in/sandra-ropero-rodriguez/",
      aboutMe: [
        {
          info: "🤖 Mis fortalezas son la constancia, el afán de superación y mi capaciad de adaptación.",
        },
        {
          info: "🔩 Junior web Developer.",
        },
        {
          info: "🕶 Inquieta, curiosa, sociable e incansable en conococer cosas nuevas.",
        },
      ],
    },
    education: [
      {
        name: "Bootcamp FullStack web Development",
        date: "2024",
        where: "Neoland School",
      },
      {
        name: "Química Industrial",
        date: "2017",
        where: "Algeciras",
      },
      {
        name: "Ciencias Ambientales",
        date: "2010",
        where: "Universidad de Córdoba",
      },
    ],
    experience: [
      {
        name: "Jr Web Development",
        date: "2023-2024 Freelance-Proyectos prácticos",
        where: "Algeciras",
        description:
          "Desde 2023 realizo proyectos prácticos personales utilizando tecnologías como JS, React, CSS, HTML, Node JS, Wordpress, MongoDB, Express JS, GIT.",
      },
      {
        name: "Jefa de Equipo",
        date: "2010 – 2023",
        where: "Sector Comercial",
        description:
          "Gestión de equipos, seguimiento de ventas, elaboración y seguimiento de objetivos, atención al cliente.",
      },
    ],
    languages: [
      {
      language: "Español",
      wrlevel: "Nativo",
      splevel: "Nativo",
      }, 
      {
      language: "English",
      wrlevel: "B2",
      splevel: "B1",
      }
    ],
    habilities: [
      "Programación",
      "Desarrollo",
      "Liderazgo",
      "Resolución eficiente de problemas",
      "Trabajo en equipo",
    ],
    projects: [
      {
        name: "Proyecto Gimnasio",
        image: image3,
        where: "Neoland School",
        description:
          "Proycecto final para Bootcamp: desarrollo de Backend y Frontend para un web funcional de un gimnasio donde el usuario puede realizar diversas gestiones.",
      },
      {
        name: "Proyectos prácticos",
        image: image2,
        where: "GitHub",
        description:
          "Pequeño proyectos prácticos personales para poner en práctica conocimientos adquiridos en Js, CSS, HTML, React o Wordpress.",
      },
    ],
  };