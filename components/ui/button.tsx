import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-white bg-primary hover:opacity-90",
        defaultEx: "text-white bg-primary hover:opacity-90 w-full lg:w-[140px] ",
        thinprimary: "text-white bg-primary hover:opacity-90 w-full lg:w-[120px] !font-normal",
        secondary: "text-black bg-secondary hover:bg-secondaryHover",
        outline:
          "text-black bg-transparent border-[1px] border-borderColor  focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2",
        destructive: "text-white bg-destructive hover:bg-destructiveHover",
        ghost:
          "text-textPrimary bg-transparent hover:bg-disabled focus:bg-disabled focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2",
        link: "text-black h-fit w-fit hover:underline underline-offset-4 hover:underline focus:outline focus:outline-2 focus:outline-primary ",
        greenish: "text-white bg-green-500 hover:bg-green-600",
        light: "text-black bg-lightBtnColor hover:bg-lightBtnColor",
        aquaLight: 'text-black bg-lightAquaBg hover:bg-lightAquaBg',
        extralight: "text-black bg-white hover:bg-white border rounded-lg",
        dark: "text-white bg-blackishBg hover:bg-blackishBg",
        submit: "text-white bg-lightBlueBg hover:bg-lightBlueBg",
        submitExtended: "text-white bg-lightBlueBg hover:bg-lightBlueBg w-full",
        darkish: 'text-white bg-primary font-normal',
        blackWhite: "text-white bg-black border border-white",
        disable: 'text-destructive underline underline-offset-2  border-none',
        none:'text-black bg-transparent'
      },
      size: {
        tight: "text-sm w-7 h-7",
        exSmall: "text-sm px-1 h-10",
        smallest: "px-2 h-10",
        xsExtended: "text-sm px-2 h-9 w-full lg:w-[90px]",
        xsTight: "text-sm px-2 h-9 w-full lg:w-[40px]",
        md: "text-sm px-5 h-9",
        xs: "text-sm px-3 h-7",
        sm: "text-sm px-5 h-9",
        lg: "text-lg px-[18px] h-9",
        lgExtended: "text-sm px-5 h-9",
        minixl: "text-sm px-5 h-10 w-[80px]",
        xl: "text-lg px-5 h-9",
        icon: "h-9 w-9",
        sidebaricon : "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
