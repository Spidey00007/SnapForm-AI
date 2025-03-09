import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartNoAxesCombined, LibraryBig, Mails, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: Mails,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: ChartNoAxesCombined,
      path: "/dashboard/analytics",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen shadow-md border">
      <div className="p-5">
        {menuList.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer text-gray-500 ${
              path == menu.path && "bg-primary text-white"
            }`}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>

      <div className="fixed bottom-7 p-6 w-64">
        <div className="my-7">
          <Progress value={33} />
          <h2 className="text-sm mt-2 text-gray-600">
            <strong>2</strong> out of <strong>5</strong> file created
          </h2>
          <h2 className="text-sm mt-3 text-gray-400">
            Upgrade your plan for unlimited form
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
<div>
  <span id="ProgressLabel" className="sr-only">
    Loading
  </span>

  <span
    role="progressbar"
    aria-labelledby="ProgressLabel"
    aria-valuenow="50"
    className="block rounded-full bg-gray-200"
  >
    <span
      className="block h-4 rounded-full bg-indigo-600 text-center text-[10px]/4"
      style="width: 50%"
    >
      <span className="font-bold text-white"> 50% </span>
    </span>
  </span>
</div>;
