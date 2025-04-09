export const organization = {
  name: "John Doe",
  role: "Regional Manager",
  heirarchyLevel: 1,
  dsr: {
    date: "2025-04-08",
    totalCalls: 15,
    meetings: 5,
    amount: 50000,
  },
  policiesSold: [
    { clientName: "Client A", amount: 20000 },
    { clientName: "Client B", amount: 30000 },
  ],
  areaSalesManagers: [
    {
      heirarchyLevel: 2,
      name: "Alice Smith",
      role: "Area Sales Manager",
      reportsTo: "John Doe",
      dsr: {
        date: "2025-04-08",
        totalCalls: 12,
        meetings: 4,
        amount: 40000,
      },
      policiesSold: [
        { clientName: "Client C", amount: 25000 },
        { clientName: "Client D", amount: 15000 },
      ],
      branchManagers: [
        {
          heirarchyLevel: 3,
          name: "Bob Johnson",
          role: "Branch Manager",
          reportsTo: "Alice Smith",
          dsr: {
            date: "2025-04-08",
            totalCalls: 10,
            meetings: 3,
            amount: 30000,
          },
          policiesSold: [
            { clientName: "Client E", amount: 18000 },
            { clientName: "Client F", amount: 12000 },
          ],
          salesManagers: [
            {
              heirarchyLevel: 4,
              name: "Carol White",
              role: "Sales Manager",
              reportsTo: "Bob Johnson",
              dsr: {
                date: "2025-04-08",
                totalCalls: 8,
                meetings: 2,
                amount: 22000,
              },
              policiesSold: [
                { clientName: "Client G", amount: 14000 },
                { clientName: "Client H", amount: 8000 },
              ],
              financialPlanners: [
                {
                  heirarchyLevel: 5,
                  name: "Daniel Black",
                  role: "Financial Planner",
                  reportsTo: "Carol White",
                  dsr: {
                    date: "2025-04-08",
                    totalCalls: 6,
                    meetings: 2,
                    amount: 12000,
                  },
                  policiesSold: [
                    { clientName: "Client I", amount: 7000 },
                    { clientName: "Client J", amount: 5000 },
                  ],
                },
                {
                  name: "Emily Green",
                  role: "Financial Planner",
                  reportsTo: "Carol White",
                  dsr: {
                    date: "2025-04-08",
                    totalCalls: 7,
                    meetings: 2,
                    amount: 13000,
                  },
                  policiesSold: [
                    { clientName: "Client K", amount: 8000 },
                    { clientName: "Client L", amount: 5000 },
                  ],
                },
                {
                  name: "Frank Blue",
                  role: "Financial Planner",
                  reportsTo: "Carol White",
                  dsr: {
                    date: "2025-04-08",
                    totalCalls: 9,
                    meetings: 3,
                    amount: 15000,
                  },
                  policiesSold: [
                    { clientName: "Client M", amount: 10000 },
                    { clientName: "Client N", amount: 5000 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      heirarchyLevel: 2,
      name: "David Lee",
      role: "Area Sales Manager",
      reportsTo: "John Doe",
      dsr: {
        date: "2025-04-08",
        totalCalls: 14,
        meetings: 3,
        amount: 45000,
      },
      policiesSold: [
        { clientName: "Client O", amount: 20000 },
        { clientName: "Client P", amount: 25000 },
      ],
      branchManagers: [
        {
          heirarchyLevel: 3,
          name: "Henry Miles",
          role: "Branch Manager",
          reportsTo: "David Lee",
          dsr: {
            date: "2025-04-08",
            totalCalls: 11,
            meetings: 2,
            amount: 28000,
          },
          policiesSold: [
            { clientName: "Client Q", amount: 15000 },
            { clientName: "Client R", amount: 13000 },
          ],
          salesManagers: [
            {
              heirarchyLevel: 4,
              name: "Irene Fox",
              role: "Sales Manager",
              reportsTo: "Henry Miles",
              dsr: {
                date: "2025-04-08",
                totalCalls: 9,
                meetings: 3,
                amount: 24000,
              },
              policiesSold: [
                { clientName: "Client S", amount: 16000 },
                { clientName: "Client T", amount: 8000 },
              ],
              financialPlanners: [
                {
                  heirarchyLevel: 5,
                  name: "Jake Turner",
                  role: "Financial Planner",
                  reportsTo: "Irene Fox",
                  dsr: {
                    date: "2025-04-08",
                    totalCalls: 7,
                    meetings: 2,
                    amount: 12000,
                  },
                  policiesSold: [
                    { clientName: "Client U", amount: 7000 },
                    { clientName: "Client V", amount: 5000 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      heirarchyLevel: 2,
      name: "Grace Kim",
      role: "Area Sales Manager",
      reportsTo: "John Doe",
      dsr: {
        date: "2025-04-08",
        totalCalls: 13,
        meetings: 4,
        amount: 46000,
      },
      policiesSold: [
        { clientName: "Client W", amount: 22000 },
        { clientName: "Client X", amount: 24000 },
      ],
      branchManagers: [
        {
          heirarchyLevel: 3,
          name: "Liam Scott",
          role: "Branch Manager",
          reportsTo: "Grace Kim",
          dsr: {
            date: "2025-04-08",
            totalCalls: 10,
            meetings: 3,
            amount: 31000,
          },
          policiesSold: [
            { clientName: "Client Y", amount: 19000 },
            { clientName: "Client Z", amount: 12000 },
          ],
          salesManagers: [
            {
              heirarchyLevel: 4,
              name: "Nina Blake",
              role: "Sales Manager",
              reportsTo: "Liam Scott",
              dsr: {
                date: "2025-04-08",
                totalCalls: 8,
                meetings: 2,
                amount: 21000,
              },
              policiesSold: [
                { clientName: "Client AA", amount: 11000 },
                { clientName: "Client AB", amount: 10000 },
              ],
              financialPlanners: [
                {
                  heirarchyLevel: 5,
                  name: "Oscar Wilde",
                  role: "Financial Planner",
                  reportsTo: "Nina Blake",
                  dsr: {
                    date: "2025-04-08",
                    totalCalls: 6,
                    meetings: 2,
                    amount: 11000,
                  },
                  policiesSold: [
                    { clientName: "Client AC", amount: 6000 },
                    { clientName: "Client AD", amount: 5000 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
