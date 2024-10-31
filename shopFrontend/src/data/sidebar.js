import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { BiPurchaseTag } from "react-icons/bi";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard"
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product"
  },
  {
    title: "Sales",
    icon: <BiPurchaseTag />,
    path: "/sale-product"
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile"
      },
      {
        title: "Edit Profile",
        path: "/edit-profile"
      }
    ]
  }
];

export default menu;
