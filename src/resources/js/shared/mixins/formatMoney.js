export default {
    data() {
        return {
            errors: null
        };
    },
    methods: {
        errorFor(field) {
            return null !== this.errors && this.errors[field]
                ? this.errors[field]
                : null;
        },
        currencyFormattedString(amount) {
            let i = parseFloat(amount);
            if (isNaN(i)) {
                i = 0.0;
            }
            let formatString = "+ $";
            if (i < 0) {
                formatString = "- $";
            }
            i = Math.abs(i);
            i = parseInt((i + 0.005) * 100);
            i = i / 100;
            let s = new String(i);
            if (s.indexOf(".") < 0) {
                s += ".00";
            }
            if (s.indexOf(".") == s.length - 2) {
                s += "0";
            }
            s = formatString + s;
            return s;
        },
        convertLastDigits(money, rem = 1) {
            let m = money.split(".");
            return m[0] + `<span style='font-size: ${rem}rem'>.${m[1]}</span>`;
        },
        lastDigitsMoneyFormat(money) {
            return this.convertLastDigits(
                "" +
                    parseFloat(money).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    })
            );
        }
    }
};
