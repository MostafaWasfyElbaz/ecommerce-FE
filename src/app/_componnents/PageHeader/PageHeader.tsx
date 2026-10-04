import { LinkItem } from "@/src/types/LinkItem";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function PageHeader({
  links,
  icon,
  name,
  description,
  color = "bg-linear-to-br from-[#16a34a] via-[#22c55e] to-[#4ade80]",
  image,
}: {
  links: LinkItem[];
  icon?: IconDefinition | null;
  name: string;
  description: string;
  color?: string;
  image?: string | null;
}) {
  return (
    <div className={`text-white ${color}`}>
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
          {links.map((link, index) => {
            return (
              <div key={link.href || `${link.label}-${index}`}>
                {index !== links.length - 1 && link.href ? (
                  <Link
                    className={
                      index !== links.length - 1
                        ? `hover:text-white transition-colors`
                        : "text-white"
                    }
                    key={index}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{link.label}</span>
                )}
                {index !== links.length - 1 && (
                  <span className="text-white/40"> /</span>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            {icon && (
              <FontAwesomeIcon
                icon={icon}
                className="w-10 h-10 text-white text-3xl"
              />
            )}
            {image && (
              <Image
                alt={name}
                className="w-10 h-10 object-contain"
                src={image}
                width={100}
                height={100}
              />
            )}
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {name}
            </h1>
            <p className="text-white/80 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
