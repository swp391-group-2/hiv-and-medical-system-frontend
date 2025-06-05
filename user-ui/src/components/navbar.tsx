import { Link, useLocation } from "react-router-dom";
import Logo from "./logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const routes: { href: string; label: string }[] = [
  {
    href: "/",
    label: "Trang chủ",
  },
  {
    href: "/service",
    label: "Dịch Vụ",
  },
  {
    href: "/education",
    label: "Giáo dục HIV",
  },
  {
    href: "/question",
    label: "Hỏi đáp",
  },
  {
    href: "/profile",
    label: "Hồ sơ",
  },
  {
    href: "/contact",
    label: "Liên hệ",
  },
];

const services: { href: string; title: string; desc: string }[] = [
  {
    href: "/service/screeningtest",
    title: "Xét nghiệm sàng lọc HIV",
    desc: "Xét nghiệm nhằm phát hiện người nghi ngờ nhiễm HIV.",
  },
  {
    href: "/service/confirmatorytest",
    title: "Xét nghiệm khẳng định HIV",
    desc: "Xác định chắc chắn một người có nhiễm HIV.",
  },
  {
    href: "/service/treatment",
    title: "Khám và điều trị HIV",
    desc: "Bao gồm khám lâm sàng, xét nghiệm CD4, tải lượng virus, điều trị bằng thuốc ARV và theo dõi định kỳ.",
  },
];

function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="sticky top-0 left-0 right-0 py-3 shadow-xl shadow-blue-500/30 z-50 bg-white">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div>
          <NavigationMenu className="relative z-10">
            <NavigationMenuList>
              {routes.map((route) => {
                if (route.label === "Dịch Vụ") {
                  return (
                    <NavigationMenuItem key={route.href}>
                      <NavigationMenuTrigger
                        className={cn(
                          "text-[16px]",
                          pathname.includes(route.href)
                            ? "text-sky-500 font-bold"
                            : ""
                        )}
                      >
                        {route.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-4">
                          <li>
                            {services.map((service) => (
                              <NavigationMenuLink asChild>
                                <Link to={service.href}>
                                  <div className="font-medium">
                                    {service.title}
                                  </div>
                                  <div className="text-muted-foreground">
                                    {service.desc}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
                return (
                  <NavigationMenuItem key={route.href}>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link
                        className={cn(
                          "text-[16px]",
                          pathname === route.href
                            ? "text-sky-500 font-bold"
                            : ""
                        )}
                        to={route.href}
                      >
                        {route.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-1.5">
          <Button variant="outline">
            <Link to="/login">Đăng Nhập</Link>
          </Button>
          <Button variant="primary">
            <Link to="/register">Đăng Ký</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
