module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx", ".tsx"] }],
		"react/react-in-jsx-scope": "off",
		"object-curly-spacing": ["error", "always", { "objectsInObjects": false }],
		"camelcase": ["warn", { "properties": "always" }],
		"default-case": "warn",
		"default-case-last": "warn",
		"no-alert": "warn",
		"no-empty-function": "warn",
		"no-new-func": "warn",
		"no-shadow": "warn",
		"require-await": "warn",
		"arrow-parens": ["error", "as-needed"],
		"arrow-spacing": ["error", { "before": true, "after": true }],
		"comma-dangle": ["warn", "never"],
		"jsx-quotes": ["error", "prefer-double"],
		"react/jsx-max-props-per-line": ["error", { "maximum": { "single": 3 }}],
		"no-multi-spaces": "error"
	}
};
