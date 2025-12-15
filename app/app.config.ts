export default defineAppConfig({
  ui: {
    modal: {
      slots: {
        overlay: "fixed inset-0",
        content:
          "!max-w-100 p-6 bg-white flex flex-col gap-6 focus:outline-none !ring-0 !shadow-none !rounded-xl",
        header: "relative p-0! border-0 min-h-0",
        wrapper: "",
        body: "flex-1 !p-0",
        footer: "flex items-center gap-1.5 p-4 sm:px-6",
        title:
          'text-[24px] leading-8 text-black font-["Russo_One"] font-normal',
        description: "mt-1 text-muted text-sm",
        close:
          "absolute -top-4 -right-4 flex items-center justify-center w-9 h-9 cursor-pointer bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent border-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:scale-100 text-gray-600 transition-none",
      },
      variants: {
        transition: {
          true: {
            overlay:
              "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
            content:
              "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]",
          },
        },
        fullscreen: {
          true: {
            content: "inset-0",
          },
          false: {
            content:
              "w-[calc(100vw-2rem)] max-w-lg rounded-lg shadow-lg ring ring-default",
          },
        },
        overlay: {
          true: {
            overlay: "bg-black/20",
          },
        },
        scrollable: {
          true: {
            overlay: "overflow-y-auto",
            content: "relative",
          },
          false: {
            content: "fixed",
            body: "overflow-y-auto",
          },
        },
      },
      compoundVariants: [
        {
          scrollable: true,
          fullscreen: false,
          class: {
            overlay: "grid place-items-center p-4 sm:py-8",
          },
        },
        {
          scrollable: false,
          fullscreen: false,
          class: {
            content:
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden",
          },
        },
      ],
    },
    form: {
      base: "grid gap-6",
    },
    formField: {
      slots: {
        root: "grid gap-1.5",
        wrapper: "",
        labelWrapper: "flex content-center items-center justify-between",
        label: "block font-medium text-default text-sm leading-5 text-gray-700",
        container: "mt-1 relative",
        description: "text-muted",
        error: "mt-2 text-error",
        hint: "text-muted",
        help: "mt-2 text-muted",
      },
      variants: {
        size: {
          xs: {
            root: "text-xs",
          },
          sm: {
            root: "text-xs",
          },
          md: {
            root: "text-sm",
          },
          lg: {
            root: "text-sm",
          },
          xl: {
            root: "text-base",
          },
        },
        required: {
          true: {
            label: "after:content-['*'] after:ms-0.5 after:text-error",
          },
        },
      },
      defaultVariants: {
        size: "md",
      },
    },
    input: {
      slots: {
        root: "relative inline-flex items-center w-full",
        base: [""],
        leading: "absolute inset-y-0 start-0 flex items-center",
        leadingIcon: "shrink-0 text-dimmed",
        leadingAvatar: "shrink-0",
        leadingAvatarSize: "",
        trailing: "absolute inset-y-0 end-0 flex items-center",
        trailingIcon: "shrink-0 text-dimmed",
      },
      variants: {
        variant: {
          outline: "text-highlighted bg-default ring ring-inset ring-accented",
          soft: "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
          subtle: "text-highlighted bg-elevated ring ring-inset ring-accented",
          ghost:
            "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
          none: "text-highlighted bg-transparent",
        },
      },
      compoundVariants: [
        {
          color: "primary",
          variant: ["outline", "subtle"],
          class:
            "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
        },
        {
          color: "primary",
          highlight: true,
          class: "ring ring-inset ring-primary",
        },
        {
          color: "neutral",
          variant: ["outline", "subtle"],
          class:
            "w-full !bg-white ring-gray-300! text-gray-600 rounded-lg focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted",
        },
        {
          color: "neutral",
          highlight: true,
          class: "ring ring-inset ring-inverted",
        },
        {
          leading: true,
          size: "xs",
          class: "ps-7",
        },
        {
          leading: true,
          size: "sm",
          class: "ps-8",
        },
        {
          leading: true,
          size: "md",
          class: "ps-9",
        },
        {
          leading: true,
          size: "lg",
          class: "ps-10",
        },
        {
          leading: true,
          size: "xl",
          class: "ps-11",
        },
        {
          trailing: true,
          size: "xs",
          class: "pe-7",
        },
        {
          trailing: true,
          size: "sm",
          class: "pe-8",
        },
        {
          trailing: true,
          size: "md",
          class: "pe-9",
        },
        {
          trailing: true,
          size: "lg",
          class: "pe-10",
        },
        {
          trailing: true,
          size: "xl",
          class: "pe-11",
        },
        {
          loading: true,
          leading: true,
          class: {
            leadingIcon: "animate-spin",
          },
        },
        {
          loading: true,
          leading: false,
          trailing: true,
          class: {
            trailingIcon: "animate-spin",
          },
        },
      ],
      defaultVariants: {
        size: "md",
        color: "primary",
        variant: "outline",
      },
    },
    inputNumber: {
      slots: {
        root: "relative inline-flex items-center",
        base: [
          "w-full h-full rounded-lg border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
          "transition-colors",
        ],
        increment: "absolute flex items-center",
        decrement: "absolute flex items-center",
      },
      variants: {
        fieldGroup: {
          horizontal: {
            root: "group has-focus-visible:z-[1]",
            base: "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none",
          },
          vertical: {
            root: "group has-focus-visible:z-[1]",
            base: "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none",
          },
        },
        color: {
          primary: "",
          secondary: "",
          success: "",
          info: "",
          warning: "",
          error: "",
          neutral: "",
        },
        size: {
          xs: "px-2 py-1 text-xs gap-1",
          sm: "px-2.5 py-1.5 text-xs gap-1.5",
          md: "px-2.5 py-1.5 text-sm gap-1.5",
          lg: "px-3 py-2 text-sm gap-2",
          xl: "px-3 py-2 text-base gap-2",
        },
        variant: {
          outline: "text-highlighted bg-default ring ring-inset ring-accented",
          soft: "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
          subtle: "text-highlighted bg-elevated ring ring-inset ring-accented",
          ghost:
            "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
          none: "text-highlighted bg-transparent",
        },
        disabled: {
          true: {
            increment: "opacity-75 cursor-not-allowed",
            decrement: "opacity-75 cursor-not-allowed",
          },
        },
        orientation: {
          horizontal: {
            base: "text-center",
            increment: "inset-y-0 end-0 pe-1",
            decrement: "inset-y-0 start-0 ps-1",
          },
          vertical: {
            increment: "top-0 end-0 pe-1 [&>button]:py-0 scale-80",
            decrement: "bottom-0 end-0 pe-1 [&>button]:py-0 scale-80",
          },
        },
        highlight: {
          true: "",
        },
        increment: {
          false: "",
        },
        decrement: {
          false: "",
        },
      },
      compoundVariants: [
        {
          color: "primary",
          variant: ["outline", "subtle"],
          class:
            "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
        },
        {
          color: "primary",
          highlight: true,
          class: "ring ring-inset ring-primary",
        },
        {
          color: "neutral",
          variant: ["outline", "subtle"],
          class:
            "bg-white ring-gray-300! text-(--Brand-950)! focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted",
        },
        {
          color: "neutral",
          highlight: true,
          class: "ring ring-inset ring-inverted",
        },
        {
          orientation: "horizontal",
          decrement: false,
          class: "text-start",
        },
      ],
      defaultVariants: {
        size: "md",
        color: "primary",
        variant: "outline",
      },
    },
    button: {
      slots: {
        base: [
          "font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
          "transition-colors cursor-pointer",
        ],
        label: "truncate",
        leadingIcon: "shrink-0",
        leadingAvatar: "shrink-0",
        leadingAvatarSize: "",
        trailingIcon: "shrink-0",
      },
      compoundVariants: [
        {
          color: "primary",
          variant: "solid",
          class:
            "flex items-center justify-center font-semibold rounded-lg min-h-12 text-inverted bg-(--Brand-950) text-white hover:bg-(--Brand-700) active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        },
        {
          color: "primary",
          variant: "outline",
          class:
            "ring ring-inset ring-primary/50 text-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        },
        {
          color: "primary",
          variant: "soft",
          class:
            "text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10",
        },
        {
          color: "primary",
          variant: "subtle",
          class:
            "text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 active:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        },
        {
          color: "primary",
          variant: "ghost",
          class:
            "text-primary hover:bg-primary/10 active:bg-primary/10 focus:outline-none focus-visible:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent",
        },
        {
          color: "primary",
          variant: "link",
          class:
            "text-primary hover:text-primary/75 active:text-primary/75 disabled:text-primary aria-disabled:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
        },
        {
          color: "neutral",
          variant: "solid",
          class:
            "!bg-gray-100 hover:bg-gray-200! ring ring-gray-300 text-inverted bg-inverted hover:bg-inverted/90 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted",
        },
        {
          color: "neutral",
          variant: "outline",
          class:
            "ring ring-inset ring-accented text-default bg-default hover:bg-elevated active:bg-elevated disabled:bg-default aria-disabled:bg-default focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted",
        },
        {
          color: "neutral",
          variant: "soft",
          class:
            "text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 focus:outline-none focus-visible:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated",
        },
        {
          color: "neutral",
          variant: "subtle",
          class:
            "ring ring-inset ring-accented text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted",
        },
        {
          color: "neutral",
          variant: "ghost",
          class:
            "text-default hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent",
        },
        {
          color: "neutral",
          variant: "link",
          class:
            "text-muted hover:text-default active:text-default disabled:text-muted aria-disabled:text-muted focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-inverted",
        },
        {
          size: "xs",
          square: true,
          class: "p-1",
        },
        {
          size: "sm",
          square: true,
          class: "p-1.5",
        },
        {
          size: "md",
          square: true,
          class: "p-1.5",
        },
        {
          size: "lg",
          square: true,
          class: "p-2",
        },
        {
          size: "xl",
          square: true,
          class: "p-2",
        },
        {
          loading: true,
          leading: true,
          class: {
            leadingIcon: "animate-spin",
          },
        },
        {
          loading: true,
          leading: false,
          trailing: true,
          class: {
            trailingIcon: "animate-spin",
          },
        },
      ],
      defaultVariants: {
        color: "primary",
        variant: "solid",
        size: "md",
      },
    },
  },
});
