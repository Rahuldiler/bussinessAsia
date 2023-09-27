import {
  UserPlusIcon,
  ChartBarIcon,
  WalletIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: ChartBarIcon,
    title: "Total Sale",
    value: "$53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "pink",
    icon: WalletIcon,
    title: "Total Earning",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "green",
    icon: BuildingOfficeIcon,
    title: "Total Assests",
    value: "$1,430",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },

];

export default statisticsCardsData;
