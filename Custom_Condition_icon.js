/// Allows a custom set image in the filepath, that can be enabled and disabled on a token.

const filePath = "file/path/to/symbol";

token.toggleEffect(filePath, {active: !(token.document.effects.includes(filePath)), overlay: false})
