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
          "w-full h-full bg-transparent rounded-lg border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
          "transition-colors",
        ],
        increment: "absolute flex items-center p-0! pr-[1px]!",
        decrement: "absolute flex items-center p-0! pl-[1px]!",
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
            increment: "opacity-2! cursor-not-allowed",
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
    checkbox: {
      slots: {
        root: "relative flex items-start",
        container: "flex items-center",
        base: "bg-white rounded-sm ring ring-inset ring-accented ring-gray-300 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2",
        indicator: "flex items-center justify-center size-full text-inverted",
        icon: "shrink-0 size-full",
        wrapper: "w-full",
        label: "block font-medium text-default",
        description: "text-muted",
      },
      variants: {
        color: {
          primary: {
            base: "cursor-pointer rounded-md focus-visible:outline-primary",
            indicator: "text-white bg-(--Brand-600) font-bold",
          },
          secondary: {
            base: "focus-visible:outline-secondary",
            indicator: "bg-secondary",
          },
          success: {
            base: "focus-visible:outline-success",
            indicator: "bg-success",
          },
          info: {
            base: "focus-visible:outline-info",
            indicator: "bg-info",
          },
          warning: {
            base: "focus-visible:outline-warning",
            indicator: "bg-warning",
          },
          error: {
            base: "focus-visible:outline-error",
            indicator: "bg-error",
          },
          neutral: {
            base: "focus-visible:outline-inverted",
            indicator: "bg-inverted",
          },
        },
        variant: {
          list: {
            root: "",
          },
          card: {
            root: "border border-muted rounded-lg",
          },
        },
        indicator: {
          start: {
            root: "flex-row",
            wrapper: "ms-2",
          },
          end: {
            root: "flex-row-reverse",
            wrapper: "me-2",
          },
          hidden: {
            base: "sr-only",
            wrapper: "text-center",
          },
        },
        size: {
          xs: {
            base: "size-3",
            container: "h-4",
            wrapper: "text-xs",
          },
          sm: {
            base: "size-3.5",
            container: "h-4",
            wrapper: "text-xs",
          },
          md: {
            base: "size-4",
            container: "h-5",
            wrapper: "text-sm",
          },
          lg: {
            base: "size-4.5",
            container: "h-5",
            wrapper: "text-sm",
          },
          xl: {
            base: "size-5",
            container: "h-6",
            wrapper: "text-base",
          },
        },
        required: {
          true: {
            label: "after:content-['*'] after:ms-0.5 after:text-error",
          },
        },
        disabled: {
          true: {
            root: "opacity-75",
            base: "cursor-not-allowed",
            label: "cursor-not-allowed",
            description: "cursor-not-allowed",
          },
        },
        checked: {
          true: "",
        },
      },
      compoundVariants: [
        {
          size: "xs",
          variant: "card",
          class: {
            root: "p-2.5",
          },
        },
        {
          size: "sm",
          variant: "card",
          class: {
            root: "p-3",
          },
        },
        {
          size: "md",
          variant: "card",
          class: {
            root: "p-3.5",
          },
        },
        {
          size: "lg",
          variant: "card",
          class: {
            root: "p-4",
          },
        },
        {
          size: "xl",
          variant: "card",
          class: {
            root: "p-4.5",
          },
        },
        {
          color: "primary",
          variant: "card",
          class: {
            root: "has-data-[state=checked]:border-primary",
          },
        },
        {
          color: "neutral",
          variant: "card",
          class: {
            root: "has-data-[state=checked]:border-inverted",
          },
        },
        {
          variant: "card",
          disabled: true,
          class: {
            root: "cursor-not-allowed",
          },
        },
      ],
      defaultVariants: {
        size: "md",
        color: "primary",
        variant: "list",
        indicator: "start",
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
            "text-gray-950! text-default hover:bg-gray-100 active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent",
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
    accordion: {
      slots: {
        root: "w-full",
        item: "border-0 border-default last:border-b-0",
        header: "flex",
        trigger:
          "group flex-1 flex-row-reverse justify-end items-center gap-1.5 font-medium text-sm py-2.5 focus-visible:outline-primary min-w-0",
        content:
          "data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none",
        body: "text-sm pb-3.5",
        leadingIcon: "shrink-0 size-5",
        trailingIcon:
          "m-0! shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200",
        label:
          "text-base leading-6 font-bold text-black text-start break-words",
      },
      variants: {
        disabled: {
          true: {
            trigger: "cursor-not-allowed opacity-75",
          },
        },
      },
    },
    select: {
      slots: {
        base: [
          "ring-0! focus:ring-none! bg-white! text-(--Brand-700)! p-0! py-2! font-semibold cursor-pointer pr-[26px]! relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
          "transition-colors",
        ],
        leading: "absolute inset-y-0 start-0 flex items-center",
        leadingIcon: "shrink-0 text-dimmed",
        leadingAvatar: "shrink-0",
        leadingAvatarSize: "",
        trailing: "absolute inset-y-0 end-0 flex items-center p-0!",
        trailingIcon: "shrink-0 text-dimmed text-(--Brand-700)",
        value: "truncate pointer-events-none",
        placeholder: "truncate text-dimmed",
        arrow: "fill-default",
        content:
          "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col ring-gray-200 shadow-sm",
        viewport:
          "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
        group: "p-1 isolate bg-white",
        empty: "text-center text-muted",
        label: "font-semibold text-highlighted",
        separator: "-mx-1 my-1 h-px bg-border",
        item: [
          "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
          "transition-colors before:transition-colors",
        ],
        itemLeadingIcon: [
          "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
          "transition-colors",
        ],
        itemLeadingAvatar: "shrink-0",
        itemLeadingAvatarSize: "",
        itemLeadingChip: "shrink-0",
        itemLeadingChipSize: "",
        itemTrailing: "ms-auto inline-flex gap-1.5 items-center",
        itemTrailingIcon: "shrink-0",
        itemWrapper: "flex-1 flex flex-col min-w-0",
        itemLabel: "truncate",
        itemDescription: "truncate text-muted",
      },
      variants: {
        fieldGroup: {
          horizontal:
            "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
          vertical:
            "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]",
        },
        size: {
          xs: {
            base: "px-2 py-1 text-xs gap-1",
            leading: "ps-2",
            trailing: "pe-2",
            leadingIcon: "size-4",
            leadingAvatarSize: "3xs",
            trailingIcon: "size-4",
            label: "p-1 text-[10px]/3 gap-1",
            item: "p-1 text-xs gap-1",
            itemLeadingIcon: "size-4",
            itemLeadingAvatarSize: "3xs",
            itemLeadingChip: "size-4",
            itemLeadingChipSize: "sm",
            itemTrailingIcon: "size-4",
            empty: "p-1 text-xs",
          },
          sm: {
            base: "px-2.5 py-1.5 text-xs gap-1.5",
            leading: "ps-2.5",
            trailing: "pe-2.5",
            leadingIcon: "size-4",
            leadingAvatarSize: "3xs",
            trailingIcon: "size-4",
            label: "p-1.5 text-[10px]/3 gap-1.5",
            item: "p-1.5 text-xs gap-1.5",
            itemLeadingIcon: "size-4",
            itemLeadingAvatarSize: "3xs",
            itemLeadingChip: "size-4",
            itemLeadingChipSize: "sm",
            itemTrailingIcon: "size-4",
            empty: "p-1.5 text-xs",
          },
          md: {
            base: "px-2.5 py-1.5 text-sm gap-1.5",
            leading: "ps-2.5",
            trailing: "pe-2.5",
            leadingIcon: "size-5",
            leadingAvatarSize: "2xs",
            trailingIcon: "size-5",
            label: "p-1.5 text-xs gap-1.5",
            item: "p-1.5 text-sm gap-1.5",
            itemLeadingIcon: "size-5",
            itemLeadingAvatarSize: "2xs",
            itemLeadingChip: "size-5",
            itemLeadingChipSize: "md",
            itemTrailingIcon: "size-5",
            empty: "p-1.5 text-sm",
          },
          lg: {
            base: "px-3 py-2 text-sm gap-2",
            leading: "ps-3",
            trailing: "pe-3",
            leadingIcon: "size-5",
            leadingAvatarSize: "2xs",
            trailingIcon: "size-5",
            label: "p-2 text-xs gap-2",
            item: "p-2 text-sm gap-2",
            itemLeadingIcon: "size-5",
            itemLeadingAvatarSize: "2xs",
            itemLeadingChip: "size-5",
            itemLeadingChipSize: "md",
            itemTrailingIcon: "size-5",
            empty: "p-2 text-sm",
          },
          xl: {
            base: "px-3 py-2 text-base gap-2",
            leading: "ps-3",
            trailing: "pe-3",
            leadingIcon: "size-6",
            leadingAvatarSize: "xs",
            trailingIcon: "size-6",
            label: "p-2 text-sm gap-2",
            item: "p-2 text-base gap-2",
            itemLeadingIcon: "size-6",
            itemLeadingAvatarSize: "xs",
            itemLeadingChip: "size-6",
            itemLeadingChipSize: "lg",
            itemTrailingIcon: "size-6",
            empty: "p-2 text-base",
          },
        },
        variant: {
          outline: "text-highlighted bg-default ring ring-inset ring-accented",
          soft: "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
          subtle: "text-highlighted bg-elevated ring ring-inset ring-accented",
          ghost:
            "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
          none: "text-highlighted bg-transparent",
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
        leading: {
          true: "",
        },
        trailing: {
          true: "",
        },
        loading: {
          true: "",
        },
        highlight: {
          true: "",
        },
        type: {
          file: "file:me-1.5 file:font-medium file:text-muted file:outline-none",
        },
      },
      compoundVariants: [
        {
          color: "primary",
          variant: ["outline", "subtle"],
          class: "focus:ring-2 focus:ring-inset focus:ring-primary",
        },
        {
          color: "primary",
          highlight: true,
          class: "ring ring-inset ring-primary",
        },
        {
          color: "neutral",
          variant: ["outline", "subtle"],
          class: "focus:ring-2 focus:ring-inset focus:ring-inverted",
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
  },
});
