export const treeData = [
  {
    id: 1,

    name: "Milind Roy",

    image: "/img/team-2.jpeg",

    position: "Sr. Manager",

    children: [
      {
        id: 2,

        name: "Vidhi Nayak",

        image: "/img/team-1.jpeg",

        position: "Manager",

        children: [
          {
            id: 3,

            name: "Arpita",

            image: "/img/team-3.jpeg",

            position: "Sales Agent",
          },

          {
            id: 4,

            name: "Kabir Agarwal",

            image: "/img/team-4.jpeg",

            position: "Sales Agent",
          },

          {
            id: 5,

            name: "Vijay Kashyap",

            image: "/img/team-1.jpeg",

            position: "Sales Agent",
          },
        ],
      },

      {
        id: 6,

        name: "Avinya",

        image: "/img/team-2.jpeg",

        position: "Manager",

        children: [
          {
            id: 7,

            name: "Arpita",

            image: "/img/team-4.jpeg",

            position: "Sales Agent",
          },

          {
            id: 8,

            name: "Kabir Agarwal",

            image: "/img/team-3.jpeg",

            position: "Sales Agent",
          },

          {
            id: 9,

            name: "Vijay Kashyap",

            image: "/img/team-2.jpeg",

            position: "Sales Agent",
          },
        ],
      },

      {
        id: 10,

        name: "Vinay",

        image: "/img/team-2.jpeg",

        position: "Manager",

        children: [
          {
            id: 11,

            name: "Arpita",

            image: "/img/team-1.jpeg",

            position: "Sales Agent",
          },

          {
            id: 12,

            name: "Kabir Agarwal",

            image: "/img/team-4.jpeg",

            position: "Sales Agent",
          },

          {
            id: 13,

            name: "Vijay Kashyap",

            image: "/img/team-1.jpeg",

            position: "Sales Agent",

            children: [
              {
                id: 11,

                name: "Arpita",

                image: "/img/team-2.jpeg",

                position: "Sales Agent",
              },

              {
                id: 12,

                name: "Kabir Agarwal",

                image: "/img/team-4.jpeg",

                position: "Sales Agent",
              },

              {
                id: 13,

                name: "Vijay Kashyap",

                image: "/img/team-1.jpeg",

                position: "Sales Agent",
              },
            ],
          },
        ],
      },
    ],
  },
];
export default treeData;
