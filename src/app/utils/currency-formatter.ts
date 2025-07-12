export function currencyFormatter(number: number | string) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(number as number);
}