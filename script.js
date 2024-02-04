    const keyboardMapping = {
        // Add more mappings as needed
        // Upper and lowercase letters can also be defined
        "՝": "՜",
        "1": "է",
        "!": "Է",
        "2": "թ",
        "@": "Թ",
        "3": "փ",
        "#": "Փ",
        "4": "ձ",
        "$": "Ձ",
        "5": "ջ",
        "%": "Ջ",
        "6": "ւ",
        "^": "Ւ",
        "7": "և",
        "&": "և",
        "8": "ր",
        "*": "Ր",
        "9": "չ",
        "(": "Չ",
        "0": "ճ",
        ")": "Ճ",
        "-": "-",
        "_": "—",
        "=": "ժ",
        "+": "Ժ",
        "q": "ք",
        "Q": "Ք",
        "w": "ո",
        "W": "Ո",
        "e": "ե",
        "E": "Ե",
        "r": "ռ",
        "R": "Ռ",
        "t": "տ",
        "T": "Տ",
        "y": "ը",
        "Y": "Ը",
        "u": "ւ",
        "U": "Ւ",
        "i": "ի",
        "I": "Ի",
        "o": "օ",
        "O": "Օ",
        "p": "պ",
        "P": "Պ",
        "\[": "խ",
        "\{": "Խ",
        "\]": "ծ",
        "\}": "Ծ",
        "\\": "շ",
        "|": "Շ",
        "a": "ա",
        "A": "Ա",
        "s": "ս",
        "S": "Ս",
        "d": "դ",
        "D": "Դ",
        "f": "ֆ",
        "F": "Ֆ",
        "g": "գ",
        "G": "Գ",
        "h": "հ",
        "H": "Հ",
        "j": "յ",
        "J": "Յ",
        "k": "կ",
        "K": "Կ",
        "l": "լ",
        "L": "Լ",
        ";": ";",
        ":": "։",
        "'": "՛",
        "\"": "\"",
        "z": "զ",
        "Z": "Զ",
        "x": "ղ",
        "X": "Ղ",
        "c": "ց",
        "C": "Ց",
        "v": "վ",
        "V": "Վ",
        "b": "բ",
        "B": "Բ",
        "n": "ն",
        "N": "Ն",
        "m": "մ",
        "M": "Մ",
        ",": ",",
        "<": "<",
        ".": "․",
        ">": ">",
        "/": "/",
        "?": "՞",
    };

    const editor = document.getElementById('editor');

    editor.addEventListener('input', function(event) {
        const selectionStart = editor.selectionStart;
        const selectionEnd = editor.selectionEnd;
        const text = editor.value;
        const convertedText = convertToArmenianPhonetic(text);
        editor.value = convertedText;

        editor.setSelectionRange(selectionStart, selectionEnd);
    });

    function convertToArmenianPhonetic(text) {
        let convertedText = '';
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            const convertedChar = keyboardMapping[char] || char;
            convertedText += convertedChar;
        }
        return convertedText;
    }

    document.getElementById('editor').addEventListener('keydown', function(event) {
        // Check if the CTRL key (or Command key on Mac) is pressed and the 'C' key is pressed
        if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
            // Check if there is a selection
            if (this.selectionStart !== undefined && this.selectionEnd !== undefined && this.selectionStart !== this.selectionEnd) {
                // If there is a selection, copy only the selected text
                const selectedText = this.value.substring(this.selectionStart, this.selectionEnd);

                // Copy the selected text to the clipboard
                navigator.clipboard.writeText(selectedText).then(function() {
                    // Show the copy notice
                    document.getElementById('copyNotice').style.display = 'block';

                    // Hide the notice after 2 seconds
                    setTimeout(function() {
                        document.getElementById('copyNotice').style.display = 'none';
                    }, 2000);

                    console.log('Text copied to clipboard:', selectedText);
                }).catch(function(err) {
                    console.error('Unable to copy text to clipboard', err);
                });

            } else {
                // If there is no selection, proceed with the default behavior
                // Prevent the default copy behavior
                event.preventDefault();

                // Select the entire content of the textarea
                this.select();

                // Copy the selected text to the clipboard
                document.execCommand('copy');

                // Deselect the text to avoid visual disruption (optional)
                window.getSelection().removeAllRanges();

                // Show the copy notice
                document.getElementById('copyNotice').style.display = 'block';

                // Hide the notice after 2 seconds
                setTimeout(function() {
                    document.getElementById('copyNotice').style.display = 'none';
                }, 2000);

                console.log('Text copied to clipboard:', this.value);
            }
        }
    });

    // Function to save the content to local storage
    function saveToLocalStorage(content) {
        localStorage.setItem('editorContent', content);
    }

    // Function to load the content from local storage
    function loadFromLocalStorage() {
        const savedContent = localStorage.getItem('editorContent');
        if (savedContent) {
            document.getElementById('editor').value = savedContent;
        }
    }

    // Load content from local storage on page load
    loadFromLocalStorage();

    // Add input event listener to the textarea
    document.getElementById('editor').addEventListener('input', function() {
        // Save the content to local storage
        saveToLocalStorage(this.value);
    });