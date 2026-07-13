import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import Reveal from "@/components/animation/reveal";

interface TitleProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  slug?: string;
  breadcrumb?: boolean;
  label?: string;
  href?: string;
  className?: string;
}

const Title = ({
  eyebrow,
  title,
  subtitle,
  slug,
  breadcrumb = false,
  label,
  href,
  className,
}: TitleProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col sm:flex-row sm:items-end sm:justify-between sm:gap-6 mb-6",
        className,
      )}
    >
      <div className="flex flex-col gap-1.5">
        {breadcrumb && (
          <Reveal delay={0}>
            <Breadcrumb>
              <BreadcrumbList className="capitalize">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/"
                      className="transition-colors hover:text-foreground"
                    >
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {slug && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="line-clamp-1">
                        {slug}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
                {title && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="line-clamp-1">
                        {title}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </Reveal>
        )}

        {eyebrow && (
          <Reveal delay={breadcrumb ? 0.06 : 0}>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {eyebrow}
            </span>
          </Reveal>
        )}

        {title && (
          <Reveal delay={breadcrumb || eyebrow ? 0.12 : 0}>
            <h3 className="text-balance font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl capitalize">
              {title.trim().split(" ").slice(0, -1).join(" ")}{" "}
              <span className="opacity-50">
                {title.trim().split(" ").slice(-1)}
              </span>
            </h3>
          </Reveal>
        )}

        {subtitle && (
          <Reveal delay={0.18}>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>

      {label && href && (
        <Reveal
          delay={0.22}
          className="self-start sm:self-auto"
        >
          <Button variant="link" asChild className="h-auto px-0">
            <Link
              href={href}
              className="group flex items-center gap-1 whitespace-nowrap"
            >
              {label}
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                size={16}
                color="currentColor"
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </Button>
        </Reveal>
      )}
    </div>
  );
};

export default Title;
