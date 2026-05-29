export interface ModuleChallenge {
  title: string;
  description: string;
  code?: string;
  /** Optional YouTube URL for a Manisha solution walkthrough (shown after all hints exhausted) */
  solutionVideoUrl?: string;
}

export interface DebugBug {
  /** Substring that must be present in the code once this bug is fixed */
  must: string;
  /** Plain-English description of what was wrong (shown as per-bug feedback) */
  hint: string;
}

export interface DebugChallenge {
  title: string;
  description: string;
  /** Broken code the kid needs to fix */
  brokenCode: string;
  /** What the correct output should look like (for the LLM validator) */
  expectedOutputDescription: string;
  /** Hint shown after first failed run */
  hint: string;
  /** Optional YouTube URL for a Manisha solution walkthrough (shown after all hints exhausted) */
  solutionVideoUrl?: string;
  /**
   * Deterministic bug checks — if provided, PythonPlayground uses string matching
   * instead of LLM validation (more reliable for fixed-answer debug challenges).
   */
  bugs?: DebugBug[];
}

export interface BlankChallenge {
  title: string;
  /** Plain-English task description shown to the kid */
  task: string;
  /** Detailed goal used by the LLM validator */
  validationGoal: string;
  /** Optional scaffolding comment(s) pre-filled in the editor */
  starterComment: string;
  /** Optional YouTube URL for a Manisha solution walkthrough (shown after all hints exhausted) */
  solutionVideoUrl?: string;
}

export interface ModuleSection {
  title: string;
  content: string;
  code?: string;
  analogy?: string;
  tip?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface ColabChallenge {
  title: string;
  emoji: string;
  description: string;
  steps: string[];
  starterCode: string;
  expectedOutput: string;
  whatsappText: string;
}

export interface TugRound {
  /** Short description of what Python command to type */
  challenge: string;
  /** Detailed instruction shown inside the game */
  instruction: string;
  /** Input placeholder text */
  placeholder: string;
  /** Client-side validator — fast, no API call needed */
  validate: (s: string) => { ok: boolean; hint?: string };
  /** How far the rope moves on a correct answer (0-100 scale) */
  strength: number;
  /** Short win message shown on correct answer */
  winMsg: string;
  /** Canonical correct answer (shown in won/lost screens) */
  exampleAnswer: string;
}

export interface TugOfWarChallengeData {
  title: string;
  subtitle: string;
  rounds: TugRound[];
}

export interface SummerCampModule {
  id: number;
  title: string;
  emoji: string;
  tagline: string;
  color: string;
  bgColor: string;
  borderColor: string;
  duration: string;
  topics: string[];
  intro: string;
  sections: ModuleSection[];
  videoUrl?: string;
  inputChallenge?: ModuleChallenge;
  challenge: ModuleChallenge;
  debugChallenge?: DebugChallenge;
  blankChallenge?: BlankChallenge;
  colabChallenge?: ColabChallenge;
  tugOfWarChallenge?: TugOfWarChallengeData;
  quiz: QuizQuestion[];
  keyLearnings: string[];
  funFact: string;
  nextPreview: string;
}

export const summerCampModules: SummerCampModule[] = [
  {
    id: 1,
    title: "Meet Python!",
    emoji: "🐍",
    tagline: "Your new robot best friend",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    duration: "Day 1",
    topics: ["What is programming?", "Why Python?", "Your first program", "How to run code"],
    videoUrl: "https://www.youtube.com/embed/2oVlYl1Wu8g?rel=0",
    intro: "Imagine you have a magical robot that does EXACTLY what you tell it to do — no more, no less. That robot is Python! Python is a programming language, which means it's a special language that both you and computers can understand. Today we're going to have a conversation with our robot for the very first time!",
    sections: [
      {
        title: "What is a Programming Language? 🗣️",
        content: "You talk to your friends in English. You talk to your robot (the computer) in Python! A programming language is just a set of words and rules that lets you give instructions to a computer. Python is special because it's super easy to read — it almost looks like English!",
        analogy: "Think of it like this: if you want your dog to sit, you say 'Sit!' Python is like that command — but for computers. And unlike your dog, the computer ALWAYS listens! 🐕",
      },
      {
        title: "Why is Python So Popular? ⭐",
        content: "Python is used everywhere! Scientists use it to study planets 🪐, doctors use it to fight diseases 🏥, game makers use it to build games 🎮, and engineers use it to program robots 🤖. Big companies like Google, Netflix, and Instagram all use Python. You're learning one of the world's most powerful tools!",
        tip: "Python was named after Monty Python, a British comedy show — not the snake! But the snake logo stuck around because it's so cool. 🐍",
      },
      {
        title: "Your Very First Program 💻",
        content: "The most famous first program in coding history is printing 'Hello, World!' Let's do it Python style! Go to trinket.io or replit.com and type this:",
        code: `# This is your very first Python program!
# Lines that start with # are called "comments" - Python ignores them
# Comments are notes you write for yourself

print("Hello, World! 🌍")
print("My name is Alex!")
print("I am learning Python today!")`,
        tip: "The print() command tells Python to show text on the screen. Whatever you put inside the quotes will appear!",
      },
      {
        title: "Let's Get Personal! 🎉",
        content: "Now let's make it more fun. Change the program to say YOUR name and YOUR favourite thing:",
        code: `print("Hello! My name is ___YOUR NAME___")
print("My favourite food is pizza! 🍕")
print("I love coding because it's AWESOME! 🚀")
print("Python is my new best friend! 🐍")`,
      },
    ],
    inputChallenge: {
      title: "Talk to Python! 🗣️",
      description: "Run the code — Python will ask for your name. Type it and press Enter to see what happens!",
      code: `name = input("What is your name? ")
print("Hello, " + name + "! 👋")
print("Welcome to Python, " + name + "!")
print("Today you're going to build something awesome! 🚀")`,
    },
    challenge: {
      title: "Your Mission: Introduction Bot",
      description: "Create a program that prints 5 things about yourself — your name, age, favourite food, favourite game, and one superpower you wish you had!",
      code: `# YOUR INTRODUCTION BOT
# Fill in the blanks with YOUR information!

print("===== ABOUT ME =====")
print("Name: ___")
print("Age: ___")
print("Favourite food: ___")
print("Favourite game: ___")
print("My superpower: ___")
print("====================")`,
      solutionVideoUrl: "https://youtube.com/shorts/om5wTk_t1ls",
    },
    quiz: [
      {
        question: "What does the print() command do in Python?",
        options: ["Prints a document on paper", "Shows text on the screen", "Draws a picture", "Makes the computer beep"],
        correct: 1,
        explanation: "print() displays text on the screen! Whatever you write inside the brackets and quotes will appear when you run your program.",
      },
      {
        question: "What symbol do you use to write a comment in Python?",
        options: ["//", "/*", "#", "--"],
        correct: 2,
        explanation: "The # symbol starts a comment in Python. Python ignores everything after # on that line, so you can write notes to yourself!",
      },
      {
        question: "Python was named after...",
        options: ["The snake", "A comedy TV show", "A scientist named Python", "A video game"],
        correct: 1,
        explanation: "Python was named after Monty Python's Flying Circus, a British comedy show! The creator, Guido van Rossum, was a fan.",
      },
      {
        question: "What happens if you type print(Hello) without quotes?",
        options: ["It prints Hello on screen", "Python gets confused and shows an error", "It prints nothing", "The program closes"],
        correct: 1,
        explanation: "Without quotes, Python thinks 'Hello' is a variable name it should look up — not text you want to print. Since no variable called Hello exists, it throws a NameError. Quotes tell Python: this is actual text!",
      },
      {
        question: "Which of these will print correctly without any errors?",
        options: ['print(hello world)', 'print("hello world")', 'Print("hello world")', 'print["hello world"]'],
        correct: 1,
        explanation: 'print("hello world") is correct — lowercase print, text inside double quotes, and round brackets. The others fail because: no quotes, capital P, or wrong bracket type.',
      },
      {
        question: "In what order does Python read your code?",
        options: ["Bottom to top", "Right to left", "Top to bottom, line by line", "It reads all lines at once"],
        correct: 2,
        explanation: "Python reads your code from top to bottom, one line at a time — just like reading a book! The first line runs first, then the second, and so on. This order matters a lot as your programs grow.",
      },
      {
        question: "What does the word 'run' mean in coding?",
        options: ["Moving the computer", "Telling Python to execute (do) your code", "Saving your file", "Deleting old code"],
        correct: 1,
        explanation: "Running your code means telling Python: 'OK, do everything I wrote!' Until you run it, your code just sits there. The Run button (or pressing Ctrl+Enter) kicks things off.",
      },
      {
        question: "Can you put an emoji inside a print() statement?",
        options: ["No, Python only understands English letters", "Yes, emojis work perfectly inside quotes!", "Only on Mac, not Windows", "Only if you install a special library"],
        correct: 1,
        explanation: 'Yes! print("Hello 🚀") works perfectly. Emojis are just characters like any other — as long as they\'re inside quotes, Python will display them. Try it!',
      },
      {
        question: "What is a programming language?",
        options: ["A foreign human language like French or Spanish", "A set of rules that lets you give instructions to a computer", "The language computers use to talk to each other", "A coding game for kids"],
        correct: 1,
        explanation: "A programming language is a special set of words and rules that both humans can write and computers can understand. Python is one of hundreds of programming languages — but one of the friendliest for beginners!",
      },
      {
        question: "What year was Python first created?",
        options: ["1981", "1991", "2001", "2010"],
        correct: 1,
        explanation: "Python was created in 1991 by Guido van Rossum — making it over 30 years old! Despite its age, it's more popular now than ever before, especially for AI and data science.",
      },
    ],
    keyLearnings: [
      "print() displays text on the screen — your first Python command",
      "Text must always go inside \"quotes\" so Python knows it's not a command",
      "# starts a comment — Python ignores it, but it helps you remember things",
      "Python reads your code top to bottom, one line at a time",
      "Errors are normal and friendly — they tell you exactly what to fix",
      "Python is free, used by NASA, Google & Netflix, and you just started learning it!",
    ],
    debugChallenge: {
      title: "Debug Zone 🐛 — Fix the Broken Code",
      description: "This code has 4 mistakes in it — the same ones almost every beginner makes on Day 1. Find them, fix them, and run the code until you get a clean output with no errors!",
      brokenCode: `# Fix all the errors in this code!
# There are 4 mistakes — can you spot them all?

print(Hello, my name is Priya!)

Print("I am learning Python today!")

print("My favourite number is 7)

print("This summer I will build awesome things! 🚀"
`,
      expectedOutputDescription:
        "Four lines printed cleanly with no errors: a greeting with a name, a learning statement, a favourite number statement, and an excited closing line.",
      hint: "Look carefully at: quotes around text, capital vs lowercase letters, and whether all brackets are closed properly.",
      solutionVideoUrl: "https://youtube.com/shorts/pIwdWWPUsQA",
      bugs: [
        {
          must: 'print("Hello, my name is Priya!")',
          hint: 'Bug 1: The text needs quotes around it — print("Hello, my name is Priya!")',
        },
        {
          must: 'print("I am learning Python today!")',
          hint: 'Bug 2: Python is case-sensitive — use print (lowercase p), not Print',
        },
        {
          must: '"My favourite number is 7")',
          hint: 'Bug 3: The closing quote is missing — "My favourite number is 7")',
        },
        {
          must: 'print("This summer I will build awesome things! 🚀")',
          hint: 'Bug 4: The closing bracket ) is missing at the end of the last print',
        },
      ],
    },

    blankChallenge: {
      title: "Your Turn! ✍️ — Write It From Scratch",
      task: `Write a Python program completely from scratch that does ALL of the following:
1. Prints a greeting that includes your name
2. Prints what you want to be when you grow up
3. Prints one fun fact about yourself
4. Prints a goodbye message

Your program must have at least 4 print() statements and must run without any errors.`,
      validationGoal:
        "The output should contain at least 4 lines. It should include a greeting or introduction with a name, something about a future goal or ambition, a personal fact, and a closing goodbye message. All lines should be readable text with no Python error messages.",
      starterComment: `# Your very own Python program — write it from scratch!
# Use print() to show text on screen
# Remember: always put text inside "quotes"

`,
      solutionVideoUrl: "https://youtube.com/shorts/gECNhePNt3M",
    },

    tugOfWarChallenge: {
      title: "Coder vs Computer — Tug of War! 🎮",
      subtitle: "The computer thinks you can't write Python. Prove it wrong. Type the right command each round and yank that rope to victory. Get it wrong and the computer pulls back. Three rounds. One winner.",
      rounds: [
        {
          challenge: "Tell Python to print your name",
          instruction: `Type a print() command that shows your name on screen. Use this exact pattern:\n  print("Your Name Here")\nReplace "Your Name Here" with your actual name — but keep the quotes!`,
          placeholder: 'print("Your Name Here")',
          exampleAnswer: 'print("Alex")',
          strength: 22,
          winMsg: "💥 PULL! print() works — the computer slipped back!",
          validate: (s: string) => {
            // Must be: print("something") or print('something')
            if (/^print\s*\(\s*['"][^'"]+['"]\s*\)\s*$/.test(s)) {
              return { ok: true };
            }
            if (!s.startsWith("print")) {
              return { ok: false, hint: "Start with print( — lowercase p, then round brackets" };
            }
            if (!s.includes("(") || !s.includes(")")) {
              return { ok: false, hint: "You need brackets: print(\"your text\")" };
            }
            if (!s.includes('"') && !s.includes("'")) {
              return { ok: false, hint: "Put quotes around your text: print(\"Alex\")" };
            }
            return { ok: false, hint: 'Close both the quote and the bracket: print("Alex")' };
          },
        },
        {
          challenge: "Store your name in a variable called name",
          instruction: `Variables are like labelled boxes — Python stores information inside them. Type:\n  name = "YourName"\nUse the = sign to store your name (in quotes) into a variable called name.`,
          placeholder: 'name = "YourName"',
          exampleAnswer: 'name = "Alex"',
          strength: 24,
          winMsg: "🎯 YES! Python stored your name — the computer is struggling!",
          validate: (s: string) => {
            // Must be: name = "something" or name = 'something'
            if (/^name\s*=\s*['"][^'"]+['"]\s*$/.test(s)) {
              return { ok: true };
            }
            if (!s.includes("name")) {
              return { ok: false, hint: 'The variable must be called name — type: name = "YourName"' };
            }
            if (!s.includes("=")) {
              return { ok: false, hint: 'Use = to assign: name = "YourName"' };
            }
            if (!s.includes('"') && !s.includes("'")) {
              return { ok: false, hint: 'Put your name in quotes: name = "Alex"' };
            }
            return { ok: false, hint: 'Almost! Try: name = "Alex" — variable name, equals sign, quoted text' };
          },
        },
        {
          challenge: "Print the variable name (without quotes!)",
          instruction: `Now tell Python to show what's inside the name variable. Type:\n  print(name)\nThis time — NO quotes around name. Quotes mean text; no quotes means "look up what's stored in this variable!"`,
          placeholder: "print(name)",
          exampleAnswer: "print(name)",
          strength: 26,
          winMsg: "🏆 BOOM! You used a variable — the computer is DONE! 💥",
          validate: (s: string) => {
            // Must be: print(name) — no quotes around name
            if (/^print\s*\(\s*name\s*\)\s*$/.test(s)) {
              return { ok: true };
            }
            if (/^print\s*\(\s*['"]name['"]\s*\)\s*$/.test(s)) {
              return { ok: false, hint: 'Remove the quotes! print(name) prints the variable. print("name") prints the word name.' };
            }
            if (!s.startsWith("print")) {
              return { ok: false, hint: "Use print() to display the variable" };
            }
            if (!s.includes("name")) {
              return { ok: false, hint: "Put the variable name inside the brackets: print(name)" };
            }
            return { ok: false, hint: "Almost! Try exactly: print(name) — no quotes, no spaces inside" };
          },
        },
      ],
    },

    funFact: "Python was created in 1991 by a Dutch programmer named Guido van Rossum. He wrote the first version during his Christmas holiday! 🎄",
    nextPreview: "Tomorrow we learn about Numbers and Strings — the two most important types of data in Python!",
  },

  {
    id: 2,
    title: "Numbers & Strings",
    emoji: "🔢",
    tagline: "The two data types that power everything",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    duration: "Day 2",
    videoUrl: "https://www.youtube.com/embed/5OBVBvS24Ns?rel=0",
    topics: ["Integers & floats", "Python as a calculator", "What are strings?", "f-strings", "The BIG difference", "String superpowers"],
    intro: "Everything a computer works with is either a NUMBER or TEXT. Your age? Number. Your name? Text. Your score in a game? Number. Your favourite song title? Text. Today you'll learn how Python thinks about both — and why they are completely different animals. By the end, you'll be making Python calculate things AND build beautiful sentences for you.",
    sections: [
      {
        title: "Numbers — Integers and Floats 🔢",
        content: "Python has two kinds of numbers. **Integers** (int) are whole numbers — no decimal point. **Floats** are numbers with a decimal point. Python treats them slightly differently, and knowing which is which will save you a lot of confusion later!",
        code: `# INTEGERS — whole numbers (no decimal)
age = 12
lives = 3
score = 9500
temperature_whole = 37   # 37 degrees, rounded

# FLOATS — numbers with a decimal point
price = 99.99
pi = 3.14159
temperature_exact = 37.5  # 37.5 degrees, precise
average_score = 8.75

# Python tells you which type it is
print(type(age))          # <class 'int'>
print(type(price))        # <class 'float'>

# Integers divided always give floats!
print(10 / 3)             # 3.3333333333333335
print(10 // 3)            # 3  ← floor division, drops decimal`,
        analogy: "Think of integers as full pizza slices 🍕 — 1, 2, 3. Floats are when someone cuts a slice in half and gives you 2.5 slices. Both are pizza, but they look different!",
      },
      {
        title: "Python as Your Calculator 🧮",
        content: "Python is an incredibly powerful calculator — way more powerful than the one on your phone. It knows all the maths operations and even some you might not have seen in school yet!",
        code: `# The 6 main operators
print(10 + 3)    # 13   → addition
print(10 - 3)    # 7    → subtraction
print(10 * 3)    # 30   → multiplication
print(10 / 3)    # 3.333 → division (always float)
print(10 // 3)   # 3    → floor division (drops decimal)
print(10 % 3)    # 1    → modulo (remainder only!)
print(10 ** 3)   # 1000 → power (10 to the power of 3)

# Real-world uses
pocket_money = 500
spent = 175
remaining = pocket_money - spent
print("Money left: " + str(remaining))   # Money left: 325

# Order of operations works like maths class (BODMAS)
print(2 + 3 * 4)    # 14, not 20 — * happens before +
print((2 + 3) * 4)  # 20 — brackets go first!`,
        tip: "The % operator (modulo) gives you the REMAINDER. So 10 % 3 = 1 because 10 ÷ 3 is 3 with 1 left over. It's super useful for checking if a number is even or odd: if age % 2 == 0 means even!",
      },
      {
        title: "Strings — Text in Python 💬",
        content: "A string is any text wrapped in quotes. The quotes are the signal to Python: 'treat everything inside as text, not as code'. You can use single quotes or double quotes — Python accepts both, just be consistent!",
        code: `# Single quotes work
name = 'Priya'

# Double quotes work too
city = "Mumbai"

# Triple quotes for multi-line text
poem = """Roses are red,
Violets are blue,
Python is awesome,
And so are you!"""

print(name)
print(city)
print(poem)

# Strings can hold ANYTHING — letters, numbers, spaces, emojis!
mixed = "I am 12 years old 🎂 and I love coding! 💻"
print(mixed)

# But "12" is TEXT, not a number you can do maths with
print("12" + "5")   # "125" — not 17!`,
        analogy: "Quotes are like a picture frame 🖼️ — everything inside the frame is just a picture (text). Python looks at it but doesn't try to calculate it. Without the frame (quotes), Python thinks it's a command or a variable name.",
      },
      {
        title: "Combining Strings — Two Ways ✨",
        content: "Joining strings together is called **concatenation**. The old way uses + signs. The new, much better way uses **f-strings** — and professional Python developers use f-strings almost exclusively today. You should too!",
        code: `name = "Arjun"
age = 13
city = "Delhi"

# OLD way — concatenation with +
# (notice you have to convert age with str())
print("My name is " + name + " and I am " + str(age) + " years old.")

# NEW way — f-strings (put f before the quote, use {} for variables)
print(f"My name is {name} and I am {age} years old.")
print(f"I live in {city}. That's a great city!")

# f-strings can even do maths inside {}!
price = 250
quantity = 3
print(f"Total cost: {price * quantity} rupees")
print(f"Next year I'll be {age + 1} years old!")

# f-strings are cleaner, shorter, and harder to get wrong
# Always prefer f-strings when mixing text and variables`,
        tip: "f-strings are your new best friend! Any time you want to put a variable inside a sentence, use f\"...{variable}...\". The f stands for 'formatted' — Python formats the string by replacing {} with the actual value.",
      },
      {
        title: "The BIG Difference 🤔",
        content: "Here's the most important thing to understand today: numbers and strings look similar but behave completely differently. The + operator does TOTALLY different things depending on which type you use it with. This trips up even experienced programmers sometimes!",
        code: `# With NUMBERS: + means ADDITION (maths)
print(5 + 3)       # 8   ← maths!

# With STRINGS: + means JOINING (concatenation)
print("5" + "3")   # "53" ← text glued together!

# Mixing them → CRASH (TypeError)
# print(5 + "3")   ← Python says: NOPE! Can't add int and str

# The fix: convert one to match the other
# Number → String: use str()
age = 12
print("I am " + str(age) + " years old")   # Works!
print(f"I am {age} years old")              # Even better!

# String → Number: use int() or float()
text_number = "25"
print(int(text_number) + 5)   # 30 ← now it's actual maths!
print(float("3.14") + 1)      # 4.140000000000001

# How to check what type something is
print(type(42))      # <class 'int'>
print(type("42"))    # <class 'str'>
print(type(3.14))    # <class 'float'>`,
        analogy: "Imagine you have 5 apples 🍎 and 3 apples — you get 8 apples. But if you have the STICKER that says '5' and the STICKER that says '3' and stick them together, you get the sticker '53'. Both use a plus sign, but one is real apples and one is just labels!",
      },
      {
        title: "String Superpowers 🦸",
        content: "Strings come with built-in tools called **methods** — special actions that strings can perform on themselves. You call them using a dot (.) after the string. These are incredibly useful for working with text!",
        code: `message = "  hello, python world!  "

# Length — how many characters?
print(len("coding"))         # 6

# Case changers
print(message.upper())       # "  HELLO, PYTHON WORLD!  "
print(message.lower())       # "  hello, python world!  "
print(message.capitalize())  # "  hello, python world!  " (first char only)
print("python".title())      # "Python" (first letter of each word)

# Whitespace removal
print(message.strip())       # "hello, python world!" (removes spaces)

# Finding and replacing
sentence = "I love cats and cats love me"
print(sentence.count("cats"))         # 2
print(sentence.replace("cats", "dogs")) # "I love dogs and dogs love me"
print(sentence.find("cats"))          # 7 (position of first 'cats')

# Checking what's inside
print("hello123".isalpha())   # False (has numbers)
print("hello".isalpha())      # True (only letters)
print("123".isdigit())        # True (only digits)

# Splitting a string into a list
words = "apple,banana,mango".split(",")
print(words)   # ['apple', 'banana', 'mango']`,
        tip: "You can chain methods! Try: '  HELLO WORLD  '.strip().lower().replace('world', 'python') — Python runs them one after another from left to right.",
      },
    ],
    challenge: {
      title: "Your Mission: The Info Card Maker",
      description: "Create a program that stores information about yourself using the right data types, then prints a nicely formatted info card using f-strings. Your card must use at least 3 variables and show a calculation!",
      solutionVideoUrl: "https://youtube.com/shorts/om5wTk_t1ls",
      code: `# INFO CARD MAKER — use f-strings!
# Store your info (use the right types!)
my_name = "___"          # string — your name
my_age = ___             # int — your age
my_hobby = "___"         # string — your hobby
my_score = ___           # int — made-up game score

# Calculate something
next_year_age = my_age + 1
double_score = my_score * 2

# Print the card using f-strings
print("╔══════════════════════╗")
print("      MY INFO CARD      ")
print(f"  Name  : {my_name}")
print(f"  Age   : {my_age} (turning {next_year_age} next year!)")
print(f"  Hobby : {my_hobby}")
print(f"  Score : {my_score} pts (double = {double_score}!)")
print("╚══════════════════════╝")`,
    },
    debugChallenge: {
      title: "Debug Zone 🐛 — Fix the Broken Code",
      description: "This code is trying to print a player profile, but it has 4 bugs! Some are type errors, some are string mistakes. Find and fix all of them, then run it to see a clean profile.",
      brokenCode: `# Player Profile Printer — fix the 4 bugs!

player_name = "Rohan"
player_age = "14"
player_score = 8750
bonus_points = 500

# Bug hunt begins here...
total = player_score + bonus_points
print("Player: " + player_name)
print("Age: " + player_age + " years old")
print("Total score: " + total)
print(f"Next year Rohan will be {player_age + 1} years old")`,
      expectedOutputDescription:
        "A clean player profile showing name, age, total score (9250), and next year's age (15) — all printed without any TypeError.",
      hint: "Look carefully at which variables are numbers and which are strings. Can you add a number to a string with +? What about in an f-string?",
      bugs: [
        {
          must: 'player_age = 14',
          hint: 'Bug 1: player_age is "14" (a string) but we need to do maths with it — remove the quotes to make it an integer',
        },
        {
          must: 'print("Total score: " + str(total))',
          hint: 'Bug 2: total is a number (int) but you\'re trying to join it to a string with + — use str(total) or switch to an f-string',
        },
        {
          must: 'player_age + 1',
          hint: 'Bug 3: Once player_age is fixed to an int, the f-string calculation {player_age + 1} will work correctly',
        },
      ],
    },

    blankChallenge: {
      title: "Your Turn! ✍️ — Build a Receipt Generator",
      task: `Write a Python program from scratch that acts like a shop receipt. It must:
1. Store at least 3 items with their prices (as floats or ints)
2. Calculate the total price
3. Apply a 10% discount to the total
4. Print a formatted receipt using f-strings showing each item, the total, and the discounted price
Run it and make sure all numbers look correct!`,
      validationGoal:
        "The output should show at least 3 items with prices, a calculated total, and a discounted final price. The receipt should use f-strings or formatted output and display correct arithmetic. All values should be numbers (not strings that look like numbers).",
      starterComment: `# RECEIPT GENERATOR — write it from scratch!
# Hint: store items as variables, calculate total, apply 10% discount
# Use f-strings to make it look neat

`,
    },

    quiz: [
      {
        question: "What will print(\"3\" + \"4\") display?",
        options: ["7", "34", "3 + 4", "Error"],
        correct: 1,
        explanation: "When + is used with strings, Python concatenates (joins) them — it doesn't add! \"3\" + \"4\" gives \"34\". To get 7, you need real numbers: print(3 + 4).",
      },
      {
        question: "Which of these is a FLOAT?",
        options: ["42", "\"3.14\"", "3.14", "True"],
        correct: 2,
        explanation: "3.14 (no quotes) is a float — a number with a decimal point. \"3.14\" in quotes is a string. 42 is an integer. True is a boolean (we'll meet that soon!).",
      },
      {
        question: "What does the % operator do in Python?",
        options: ["Calculates percentage", "Gives the remainder after division", "Converts to percent string", "Divides and rounds"],
        correct: 1,
        explanation: "% is the modulo operator — it gives the REMAINDER. So 10 % 3 = 1 because 10 ÷ 3 is 3 with 1 left over. It's often used to check if a number is even (number % 2 == 0).",
      },
      {
        question: "What is the correct f-string to print \"I am 12 years old\" if age = 12?",
        options: ['print("I am age years old")', 'print(f"I am {age} years old")', 'print("I am " + age + " years old")', 'print(f"I am age years old")'],
        correct: 1,
        explanation: 'f-strings use curly braces {} to insert variable values. print(f"I am {age} years old") is correct — the f before the quote activates f-string mode, and {age} gets replaced by the actual value 12.',
      },
      {
        question: "What does len(\"CodersBee\") return?",
        options: ["8", "9", "10", "CodersBee"],
        correct: 1,
        explanation: "len() counts characters including uppercase and lowercase. C-o-d-e-r-s-B-e-e = 9 characters. It counts every single character including spaces and punctuation in other strings.",
      },
      {
        question: "Why does print(\"Hello \" + 5) cause an error?",
        options: ["5 is too small a number", "You can't use + inside print()", "Python can't join a string and an integer directly", "\"Hello\" needs to be lowercase"],
        correct: 2,
        explanation: "Python's + operator can join two strings OR add two numbers — but it can't mix types. \"Hello \" is a str and 5 is an int. Fix: use str(5) to convert, or use an f-string: f\"Hello {5}\".",
      },
      {
        question: "What does \"python\".upper() return?",
        options: ["Python", "PYTHON", "python", "Error — upper() doesn't exist"],
        correct: 1,
        explanation: ".upper() is a string method that converts every character to uppercase. \"python\".upper() returns \"PYTHON\". Similarly, .lower() makes everything lowercase and .title() capitalises each word.",
      },
    ],
    keyLearnings: [
      "Integers are whole numbers (12, 100); floats have decimals (3.14, 9.99) — both are numbers",
      "Python operators: + - * / // % ** — // gives whole number result, % gives remainder",
      "Strings are text wrapped in quotes — single, double, or triple for multi-line",
      "f-strings (f\"Hello {name}\") are the modern way to mix variables into text — use them always",
      "print(5 + 3) = 8, but print(\"5\" + \"3\") = \"53\" — + means totally different things!",
      "Never mix str + int directly — use str() to convert, or use an f-string",
      "String methods: len(), .upper(), .lower(), .strip(), .replace(), .count(), .split()",
    ],
    funFact: "The word 'string' in programming comes from the idea of characters strung together like beads on a necklace — one after another in a line! 📿 The longest string ever stored in Python had over 1 billion characters.",
    nextPreview: "Next up: Variables — the magical named boxes that let your program remember things!",
  },

  {
    id: 3,
    title: "Variables — Memory Boxes",
    emoji: "📦",
    tagline: "Give your data a name and remember it!",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    duration: "Day 3",
    videoUrl: "https://www.youtube.com/embed/hZ1OyqX5lfQ?rel=0",
    topics: ["What are variables?", "Naming rules", "Changing values", "Multiple variables", "Constants", "Swapping values"],
    intro: "Imagine your brain has little boxes where you store information. Your name is in one box, your age in another, your best friend's name in another. Variables in Python are exactly like those memory boxes! You give each box a name, put something inside, and you can look inside any time. The amazing part? You can change what's in the box, use multiple boxes together, and even swap what's in two boxes in a single line. Today you'll master all of it!",
    sections: [
      {
        title: "What is a Variable? 📦",
        content: "A variable is a named container that stores a value. When you write `name = 'Arjun'`, you're creating a box called **name** and putting 'Arjun' inside it. Whenever you write `name` later, Python opens that box and uses whatever is inside. The = sign is called the **assignment operator** — it puts the value on the right into the box on the left.",
        code: `# Creating variables — the = sign puts values INTO boxes
player_name = "SuperCoder"    # a string variable
player_lives = 3              # an integer variable
player_score = 0              # starts at zero
is_game_over = False          # a boolean (True/False)

# Using variables — Python opens the box and uses what's inside
print(player_name)     # SuperCoder
print(player_lives)    # 3
print(player_score)    # 0

# f-strings are the BEST way to use variables in sentences
print(f"{player_name} has {player_lives} lives and {player_score} points!")
# SuperCoder has 3 lives and 0 points!`,
        analogy: "Think of your school locker 🏫 — you put your lunch box in locker #5. Later, when you're hungry, you open locker #5 and take out your lunch. The locker NUMBER is the variable name, and your lunch is the value. You can swap the lunch for something else anytime!",
      },
      {
        title: "Naming Your Variables 🏷️",
        content: "Variable names have rules — and a style guide. Python will **crash** if you break the rules. It will still run if you break the style, but other programmers (and future-you!) will find your code harder to read.",
        code: `# ✅ GOOD variable names — clear, readable, snake_case
my_name = "Riya"
player_score = 100
favourite_color = "blue"
age_in_years = 12
is_raining = True
total_items_in_cart = 5

# ❌ ILLEGAL names — Python will crash!
# 1name = "bad"        # Can't START with a number
# my-name = "bad"      # Hyphens (-) are not allowed
# my name = "bad"      # Spaces are not allowed
# for = "bad"          # 'for' is a Python keyword — reserved!
# print = "bad"        # Don't overwrite built-in names!

# ⚠️ LEGAL but BAD style — Python won't crash, but ugly!
x = "Riya"            # Too short — what does x mean?
MyName = "Riya"       # CamelCase is for class names, not variables
MYSCORE = 100         # ALL_CAPS means constant (we'll see this next!)`,
        tip: "Use **snake_case** — all lowercase with underscores between words. Like `my_best_friend`, not `myBestFriend` or `MyBestFriend`. Python developers worldwide follow this rule (it's in the official Python style guide, PEP 8!).",
      },
      {
        title: "Variables Can Change! 🔄",
        content: "The word 'variable' literally means **something that varies**. You can change what's inside a box whenever you want — and Python is brilliant at this. This is how games track your score as it goes up, or how apps update your profile. Each time you reassign, the old value is simply replaced.",
        code: `# A variable updating over time — like a live score
score = 0
print(f"🎮 Game starts! Score: {score}")

score = score + 10          # Found a coin
print(f"🪙 Coin collected! Score: {score}")    # 10

score = score + 25          # Defeated an enemy
print(f"👾 Enemy defeated! Score: {score}")    # 35

score = score * 2           # Double-points zone!
print(f"✨ DOUBLE ZONE! Score: {score}")       # 70

# Shortcut operators (save you typing)
score += 15    # same as: score = score + 15   → 85
score -= 5     # same as: score = score - 5    → 80
score *= 2     # same as: score = score * 2    → 160
score //= 3    # same as: score = score // 3   → 53
print(f"🏁 Final score: {score}")`,
        analogy: "Imagine a whiteboard with your score written on it. You erase the old number and write the new one. The whiteboard is the variable, the number is the value. You can erase and rewrite as many times as you like! 🎯",
      },
      {
        title: "Using Multiple Variables Together 🤝",
        content: "Variables become truly powerful when you combine them. You can build a whole mini-calculator using just variables — no magic numbers scattered through your code. This makes your program easy to update: change one variable and everything adjusts automatically!",
        code: `# Trip cost calculator — all values in variables
distance_km = 250
fuel_cost_per_km = 8       # rupees per km
hotel_cost_per_night = 1500
nights = 3
food_budget_per_day = 500

# Now calculate everything using variables
fuel_total = distance_km * fuel_cost_per_km
hotel_total = hotel_cost_per_night * nights
food_total = food_budget_per_day * nights
grand_total = fuel_total + hotel_total + food_total

print("🚗 TRIP BUDGET CALCULATOR")
print(f"  Fuel ({distance_km} km):  ₹{fuel_total}")
print(f"  Hotel ({nights} nights): ₹{hotel_total}")
print(f"  Food ({nights} days):   ₹{food_total}")
print(f"  ─────────────────────")
print(f"  GRAND TOTAL:         ₹{grand_total}")

# To update the whole calculation, just change ONE number above!
# Change distance_km = 400 and everything recalculates automatically`,
        tip: "Never 'hard-code' numbers directly inside a calculation like `250 * 8`. Store them in variables first! Future-you will be VERY grateful when you need to change the fuel price.",
      },
      {
        title: "Constants — Values That Never Change 🔒",
        content: "Some values should never change during your program — like Pi (3.14159), the speed of light, or the number of seconds in a day. By convention, Python programmers write these in **ALL_CAPS** to signal: 'don't touch this!' Python won't actually stop you from changing it, but the ALL_CAPS shouts a warning to everyone reading the code.",
        code: `# Constants — write in ALL_CAPS as a signal to everyone
PI = 3.14159
SECONDS_IN_A_DAY = 86400
MAX_LIVES = 3
SCHOOL_NAME = "Greenview High"
GST_RATE = 0.18           # 18% GST

# Multiple assignment — set several variables in one line!
a, b, c = 10, 20, 30
print(a, b, c)            # 10 20 30

x = y = z = 0             # set them ALL to the same value
print(x, y, z)            # 0 0 0

# Using constants in calculations
radius = 7
area = PI * radius ** 2
print(f"Circle area: {area:.2f}")    # :.2f means 2 decimal places

price = 500
gst_amount = price * GST_RATE
print(f"Price + GST: ₹{price + gst_amount}")  # ₹590.0`,
        analogy: "ALL_CAPS is like writing something in red permanent marker instead of pencil 🖊️. Python CAN erase it if forced, but the red marker tells everyone: 'This is important — don't change it without a really good reason!'",
      },
      {
        title: "The Variable Swap Trick 🔄✨",
        content: "Here's one of Python's most delightful tricks: swapping two variables in ONE line. In other programming languages you need a temporary 'helper' variable — three lines of code. Python makes it beautiful. This is a classic interview question for programmers!",
        code: `# The classic way (other languages) — needs a temp variable
a = "🍕 Pizza"
b = "🍔 Burger"

# Swap using temp
temp = a       # save a's value
a = b          # overwrite a with b
b = temp       # put the saved value into b
print(a, b)    # 🍔 Burger 🍕 Pizza

# THE PYTHON WAY — one line! ✨
x = "First"
y = "Second"
x, y = y, x   # Python swaps them simultaneously!
print(x, y)    # Second First

# Real use case: sorting two numbers
low = 100
high = 5
if low > high:         # if they're in the wrong order...
    low, high = high, low    # ...swap them!
print(f"Low: {low}, High: {high}")  # Low: 5, High: 100`,
        tip: "The one-line swap `a, b = b, a` works because Python evaluates the ENTIRE right side first, then assigns. So it reads both b and a before changing either one. It's like two people handing each other things simultaneously! 🤝",
      },
    ],
    challenge: {
      title: "Your Mission: The Game Character Creator 🎮",
      description: "Create a game character using variables of different types, build their stats, and level them up! Use f-strings throughout. Your character must have at least 5 attributes, a calculated total power score, and show what happens after levelling up.",
      code: `# ⚔️ GAME CHARACTER CREATOR
# Step 1: Define your character's base stats
hero_name = "___"        # string — your hero's name
hero_class = "___"       # string — Wizard, Warrior, Archer, etc.
hero_level = 1           # int
hero_health = 100        # int
hero_attack = ___        # int — pick a number 1–50
hero_defense = ___       # int — pick a number 1–30

# Step 2: Calculate total power score
total_power = hero_health + (hero_attack * 3) + (hero_defense * 2)

# Step 3: Print the character card using f-strings
print("=" * 30)
print(f"⚔️  {hero_name} the {hero_class}")
print("=" * 30)
print(f"  Level   : {hero_level}")
print(f"  Health  : {hero_health} HP")
print(f"  Attack  : {hero_attack}")
print(f"  Defense : {hero_defense}")
print(f"  POWER   : {total_power} ⚡")
print("=" * 30)

# Step 4: Level up! Update the stats
hero_level += 1
hero_health += 20
hero_attack += 5
hero_defense += 3
new_power = hero_health + (hero_attack * 3) + (hero_defense * 2)

print(f"\\n🎉 {hero_name} levelled up to Level {hero_level}!")
print(f"   Power: {total_power} → {new_power} (+{new_power - total_power})")`,
    },

    debugChallenge: {
      title: "Debug Zone 🐛 — Fix the Broken Variables",
      description: "This code tracks a student's quiz scores, but it has 3 bugs involving variable naming, type errors, and a sneaky undefined variable. Find and fix all 3, then run it to see a clean score report!",
      brokenCode: `# Student Score Tracker — find the 3 bugs!

student name = "Priya"      # Bug 1
quiz1 = 85
quiz2 = 92
quiz3 = 78

total = quiz1 + quiz2 + quiz3
average = total / 3

print("Student: " + student_name)
print("Total marks: " + total)       # Bug 2
print(f"Average: {average:.1f}/100")
print(f"Percentage: {averege:.1f}%") # Bug 3`,
      expectedOutputDescription:
        "A clean score report showing Priya's name, total marks (255), average (85.0/100) and percentage (85.0%) — all printed without any error.",
      hint: "Look carefully at how variables are named and how they're used in print statements. Can you spot the space, the type mismatch, and the typo?",
      bugs: [
        {
          must: "student_name = ",
          hint: 'Bug 1: Variable names cannot have spaces! "student name" must be written as "student_name" (with an underscore)',
        },
        {
          must: 'print("Total marks: " + str(total))',
          hint: "Bug 2: total is an integer (int) — you can't join it to a string with +. Use str(total) to convert it first, or switch to an f-string: f\"Total marks: {total}\"",
        },
        {
          must: "average:.1f}%",
          hint: 'Bug 3: "averege" is a typo — the variable is called "average". Python is case-sensitive and spelling-sensitive — every character must match exactly!',
        },
      ],
    },

    blankChallenge: {
      title: "Your Turn! ✍️ — Build a Pocket Money Tracker",
      task: `Write a Python program from scratch that tracks your weekly pocket money. It must:
1. Store your weekly allowance, this week's spending (at least 3 items), and a savings goal
2. Calculate total spent, money remaining, and how many more weeks to reach the savings goal
3. Print a neat weekly report using f-strings
4. Use ALL_CAPS for any constant values (like the savings goal)
Bonus: Add a check — if remaining money is negative, print a warning!`,
      validationGoal:
        "The output should show a weekly allowance, at least 3 spending items with amounts, total spent, money remaining, and a weeks-to-goal calculation. All values should be variables and the output should be formatted with f-strings. The maths must be correct.",
      starterComment: `# 💰 POCKET MONEY TRACKER — write from scratch!
# Hints:
# - Store allowance, spending items, savings goal as variables
# - Calculate total_spent, remaining = allowance - total_spent
# - weeks_to_goal = savings_goal / remaining  (if remaining > 0)
# - Use f-strings for all output

`,
    },

    quiz: [
      {
        question: "What happens when you write: score = score + 10?",
        options: ["Creates a new variable called 'score + 10'", "Adds 10 to the current value of score", "Causes an error because you can't use a variable in its own assignment", "Sets score to exactly 10"],
        correct: 1,
        explanation: "Python evaluates the right side FIRST (current score + 10), then stores the result back into score. It's like taking money out of your piggy bank, adding more coins, and putting it all back in!",
      },
      {
        question: "Which variable name follows Python's rules?",
        options: ["2fast", "my-speed", "my_speed", "my speed"],
        correct: 2,
        explanation: "my_speed is correct! It uses only letters and underscores. 2fast starts with a number (not allowed), my-speed uses a hyphen (not allowed — Python reads - as subtraction!), and my speed has a space (not allowed).",
      },
      {
        question: "What does score += 5 mean?",
        options: ["score = 5", "score = score + 5", "score = score - 5", "score = score * 5"],
        correct: 1,
        explanation: "+= is a shortcut operator! score += 5 is exactly the same as writing score = score + 5. It takes what's already in score, adds 5, and saves the result back. Python also has -=, *=, //= and more.",
      },
      {
        question: "What will Python print for the last line?\n\nx = 10\nx = x * 2\nx += 5\nprint(x)",
        options: ["10", "15", "20", "25"],
        correct: 3,
        explanation: "Step by step: x starts at 10. x = x * 2 makes it 20. x += 5 adds 5 to make 25. print(x) prints 25. Variables update one step at a time — trace through them like following a recipe!",
      },
      {
        question: "What's wrong with this variable name: 1st_place = 'Arjun'",
        options: ["'Arjun' should be a number", "Variable names can't start with a digit", "The underscore is not allowed", "Nothing — this is perfectly valid"],
        correct: 1,
        explanation: "Python variable names must start with a LETTER or underscore, never a digit. 1st_place is illegal because it starts with 1. Fix: first_place = 'Arjun' works perfectly!",
      },
      {
        question: "What does this one line do?\n\na, b = b, a",
        options: ["Creates two new variables a and b", "Swaps the values of a and b", "Causes an error — you can't assign two variables at once", "Sets both a and b to the same value"],
        correct: 1,
        explanation: "This is Python's beautiful swap trick! Python evaluates the entire right side (b, a) first, then assigns. So a gets the old b, and b gets the old a — all at once. In other languages, you'd need a temporary variable and 3 lines of code!",
      },
      {
        question: "Why do Python programmers write some variables in ALL_CAPS like MAX_LIVES = 3?",
        options: ["Python requires it for numbers", "It makes the program run faster", "It's a signal that this value should not change during the program", "ALL_CAPS variables are automatically saved to a file"],
        correct: 2,
        explanation: "ALL_CAPS is a convention (a shared agreement) that says 'this is a constant — don't change it!' Python won't stop you from changing it, but any programmer who sees ALL_CAPS knows to leave it alone. It's like writing in permanent red marker instead of pencil!",
      },
    ],
    keyLearnings: [
      "A variable is a named box that stores a value — create it with = : age = 12",
      "Variable names must start with a letter/underscore, use only letters/digits/underscores, no spaces",
      "Use snake_case (my_variable) for regular variables — Python's official style guide says so",
      "Variables can change: score = score + 10 replaces the old value with a new one",
      "Shortcut operators: += -= *= //= all update a variable in one step",
      "ALL_CAPS signals a constant — a value that should never change (PI, MAX_LIVES, GST_RATE)",
      "Multiple assignment: a, b = 10, 20 sets two variables in one line",
      "Swap trick: a, b = b, a swaps two variables in one elegant line — no temp variable needed!",
    ],
    funFact: "A computer's RAM (Random Access Memory) is basically a HUGE collection of variables! Modern laptops have billions of variable 'slots'. When you close a program, all its variables are erased instantly — like clearing a whiteboard. That's why unsaved work disappears when an app crashes! 🎒",
    nextPreview: "Day 4: Making Decisions with If/Else — teaching Python to think and choose for itself!",
  },

  {
    id: 4,
    title: "Making Decisions",
    emoji: "🤔",
    tagline: "Teach Python to think for itself!",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    duration: "Day 4",
    topics: ["If statements", "If-else branches", "elif for many choices", "Comparison operators", "and / or / not", "Nested if statements"],
    intro: "Every single day you make hundreds of decisions without even thinking about it. If it's raining, you grab an umbrella. If your homework is done AND it's not too late, you play games. If you're hungry OR it's lunchtime, you eat. Python makes decisions EXACTLY the same way — using if, elif, and else. Today you'll teach your code to think, choose, and react!",
    sections: [
      {
        title: "The If Statement — Making One Decision 🚦",
        content: "An if statement says: **IF this condition is True, run this code.** The colon (:) at the end and the **indentation** (4 spaces) are not optional — they're how Python knows which lines belong inside the if block. Get either wrong and Python crashes!",
        code: `# Basic if — only runs when condition is True
temperature = 38

if temperature > 37:
    print("🤒 You have a fever!")
    print("Rest and drink lots of water.")
    print("No school today!")

print("This always prints — it's outside the if")

# if with a boolean variable
is_raining = True

if is_raining:               # same as: if is_raining == True
    print("☔ Grab an umbrella!")

# if with a string check
mood = "happy"
if mood == "happy":
    print("😊 Great day to code!")`,
        analogy: "Think of if as a bouncer at a club 🚪. The bouncer has ONE rule to check. If you pass → you get in. If not → you walk straight past. The bouncer doesn't call after you — the rest of the code just continues!",
      },
      {
        title: "If-Else — Two Choices 🔀",
        content: "What if you want to do something different when the condition is False? Add an **else** block — it's the backup plan that ALWAYS runs when if is False. Together they cover ALL cases: either the condition is True, or it's not.",
        code: `score = 75

if score >= 60:
    print("✅ PASS! Great job!")
    print("You move to the next level!")
else:
    print("❌ Not quite — try again!")
    print("You'll get it next time! 💪")

# Another example — even vs odd
number = 17

if number % 2 == 0:
    print(f"{number} is EVEN 🟢")
else:
    print(f"{number} is ODD 🔴")

# One more — time-based greeting
hour = 14    # 2pm

if hour < 12:
    print("Good morning! ☀️")
else:
    print("Good afternoon! 🌤️")`,
        tip: "else never has a condition — it's always just `else:`. It catches EVERYTHING that didn't match the if (or any elif). Think of it as the default drawer where miscellaneous things go! 🗂️",
      },
      {
        title: "Elif — Many Choices 📋",
        content: "What if you have more than two options? **elif** (short for 'else if') lets you chain as many conditions as you need. Python checks them **in order from top to bottom** and runs the FIRST one that's True — then skips the rest entirely.",
        code: `# Grade calculator with 5 levels
score = 85

if score >= 90:
    grade = "A+"
    msg = "Outstanding! 🌟"
elif score >= 80:
    grade = "A"
    msg = "Excellent! ⭐"
elif score >= 70:
    grade = "B"
    msg = "Good work! 👍"
elif score >= 60:
    grade = "C"
    msg = "Keep trying! 📚"
else:
    grade = "F"
    msg = "Let's practise more! 💪"

print(f"Score: {score}  →  Grade: {grade}  →  {msg}")

# Weather advisor
temp = 28

if temp >= 38:
    advice = "🥵 Stay indoors — dangerous heat!"
elif temp >= 30:
    advice = "☀️ Hot! Wear light clothes and sunscreen."
elif temp >= 20:
    advice = "🌤️ Pleasant — perfect for a t-shirt!"
elif temp >= 10:
    advice = "🧥 Cool — grab a jacket."
else:
    advice = "🥶 Cold! Bundle up!"

print(f"{temp}°C → {advice}")`,
        analogy: "elif is like a multiple-choice exam 📝. Python reads question 1 (if). Wrong? Try question 2 (elif). Still wrong? Question 3 (elif)... and so on. The moment it finds the right answer, it stops reading.",
      },
      {
        title: "Comparison Operators — The Decision Tools 🔍",
        content: "Every if condition uses comparison operators — the symbols that compare two values and return True or False. These six operators are the backbone of every decision in every program ever written.",
        code: `age = 15
height = 162

# The 6 comparison operators
print(age == 15)     # True  — equal to
print(age != 10)     # True  — NOT equal to
print(age > 13)      # True  — greater than
print(age < 18)      # True  — less than
print(age >= 15)     # True  — greater than OR equal
print(age <= 20)     # True  — less than OR equal

# Real-world: roller coaster height check
MIN_HEIGHT = 140

if height >= MIN_HEIGHT:
    print(f"✅ {height}cm — you can ride! 🎢")
else:
    print(f"❌ {height}cm — need {MIN_HEIGHT - height}cm more to ride.")

# WARNING: = vs ==
x = 5          # = ASSIGNS (puts 5 into x)
if x == 5:     # == COMPARES (asks: is x equal to 5?)
    print("x is five!")
# NEVER write: if x = 5:  ← SyntaxError!`,
        tip: "The most common beginner mistake: writing `if score = 90:` instead of `if score == 90:`. One = puts a value in a box. Two == asks a question. When in doubt — **if you're comparing, use two!**",
      },
      {
        title: "Logical Operators — and, or, not 🧠",
        content: "Real decisions often involve multiple conditions at once. **and** requires ALL conditions to be True. **or** needs just ONE. **not** flips True to False and vice versa. Combining these lets you write powerful, expressive conditions.",
        code: `age = 15
has_ticket = True
is_member = False
height = 155

# AND — every condition must be True
if age >= 13 and has_ticket:
    print("✅ Welcome to the concert! 🎵")

# OR — at least one condition must be True
if age < 5 or is_member:
    print("🎟️ You get in for free!")
else:
    print("💳 That's ₹200 please.")

# NOT — flips True ↔ False
if not is_member:
    print("💡 Tip: join our membership for discounts!")

# Combining AND + OR (use brackets to be clear!)
if height >= 140 and (age >= 10 or has_ticket):
    print("🎢 You can ride the roller coaster!")

# Truth table — quickly test logic
print(True and False)   # False — one is False
print(True or False)    # True  — one is True
print(not True)         # False — flipped!`,
        analogy: "**and** is like needing BOTH a key AND a code to open a safe 🔐. **or** is like any door in a building — open ONE and you're in. **not** is the light switch — it just flips whatever state you had! 💡",
      },
      {
        title: "Nested If — Decisions Inside Decisions 🪆",
        content: "Sometimes a decision leads to another decision. You can put an if statement **inside** another if statement — this is called **nesting**. Each level needs its own indentation (4 more spaces). It's powerful but keep it to 2–3 levels max or it gets hard to read!",
        code: `# Theme park entry system
age = 14
height = 158
has_parent = False

if age >= 10:
    print("✅ Old enough to enter the park")
    if height >= 150:
        print("✅ Tall enough for all rides")
        if age >= 18 or has_parent:
            print("✅ Can enter the extreme zone 🎢")
        else:
            print("⚠️ Extreme zone needs a parent (under 18)")
    else:
        still_need = 150 - height
        print(f"⚠️ Need {still_need}cm more for big rides")
        print("✅ Junior rides are available!")
else:
    print("❌ Must be 10+ to enter")

# Cleaner version using 'and' (same logic, fewer levels)
if age >= 10 and height >= 150 and (age >= 18 or has_parent):
    print("Full access — extreme zone unlocked! 🌟")`,
        tip: "Before adding a nested if, ask: can I combine the conditions with `and` / `or` instead? Often you can flatten nested ifs into a single condition — cleaner code is always better! 🏆",
      },
    ],
    challenge: {
      title: "Your Mission: The Smart Ticket Machine 🎟️",
      description: "Build a cinema ticket price calculator! Prices vary by age AND day of week. Use if/elif/else and logical operators. Your program must handle at least 4 different ticket categories.",
      code: `# 🎬 SMART CINEMA TICKET MACHINE
age = 14           # Change to test different ages!
day = "Saturday"   # Change to: Monday, Saturday, Sunday

BASE_PRICE = 250   # rupees

print(f"Customer age: {age} | Day: {day}")
print("-" * 35)

# Determine ticket type by age
if age < 5:
    ticket_type = "Infant"
    price = 0
elif age < 12:
    ticket_type = "Child"
    price = BASE_PRICE * 0.5
elif age >= 60:
    ticket_type = "Senior"
    price = BASE_PRICE * 0.6
else:
    ticket_type = "Adult"
    price = BASE_PRICE

# Weekend surcharge
if day == "Saturday" or day == "Sunday":
    price = price * 1.2
    print("📅 Weekend surcharge applied (+20%)")

# Final output
print(f"Ticket type : {ticket_type}")
print(f"Final price : ₹{price:.0f}")

if price == 0:
    print("🎉 FREE entry for infants!")
elif price < 150:
    print("👍 Great value!")
else:
    print("🍿 Enjoy the film!")`,
    },

    debugChallenge: {
      title: "Debug Zone 🐛 — Fix the Grade Calculator",
      description: "This grade calculator has 3 bugs — one classic assignment-vs-comparison mistake, one type error, and one logical error. Fix them all to get a clean grade report!",
      brokenCode: `# Grade Report Generator — fix 3 bugs!
score = 85
bonus = 10
final_score = score + bonus   # 95

if final_score = 90:          # Bug 1
    grade = "A+"
elif final_score >= 80:
    grade = "A"
elif final_score >= 70:
    grade = "B"
else:
    grade = "C"

print("Final score: " + final_score)   # Bug 2
print("Grade: " + grade)

if final_score >= 90 and grade = "A+":  # Bug 3
    print("🌟 Outstanding performance!")`,
      expectedOutputDescription:
        "A clean grade report printing 'Final score: 95', 'Grade: A+', and '🌟 Outstanding performance!' — with no SyntaxError or TypeError.",
      hint: "Look for: (1) a place where = should be == inside an if condition, (2) a type mismatch when joining a number to a string, and (3) another = vs == confusion.",
      bugs: [
        {
          must: "if final_score == 90:",
          hint: "Bug 1: Inside an if condition, you must use == to compare — not =. Writing `if final_score = 90:` is a SyntaxError because = is for assignment, not comparison!",
        },
        {
          must: "str(final_score)",
          hint: "Bug 2: final_score is an integer. You can't join it to a string with +. Wrap it: str(final_score), or switch to an f-string: f\"Final score: {final_score}\"",
        },
        {
          must: 'grade == "A+"',
          hint: 'Bug 3: Same mistake again — inside the if condition, `grade = "A+"` is assignment (SyntaxError). Change it to `grade == "A+"` to compare.',
        },
      ],
    },

    blankChallenge: {
      title: "Your Turn! ✍️ — Build an RPG Character Class Selector",
      task: `Write a Python program that recommends an RPG character class based on stats. It must:
1. Store three stat values: strength (1–10), agility (1–10), and magic (1–10)
2. Use if/elif/else to recommend a class:
   - strength is highest → "⚔️ Warrior"
   - agility is highest → "🏹 Ranger"
   - magic is highest → "🪄 Mage"
   - all equal → "🌟 Paladin (master of all!)"
3. Print the character summary using f-strings
4. BONUS: Add a "rare class" message if any stat is 10 (legendary status!)`,
      validationGoal:
        "The output should show the three stat values, a recommended character class based on which stat is highest, and a formatted character summary. The logic must correctly identify the highest stat and map it to the right class.",
      starterComment: `# ⚔️ RPG CHARACTER CLASS SELECTOR
# Hint: compare strength, agility, and magic to each other
# Use >= to handle ties (e.g. strength >= agility and strength >= magic)

`,
    },

    quiz: [
      {
        question: "What does == mean in Python?",
        options: ["Assigns a value to a variable", "Checks if two values are equal", "Makes something greater than", "Multiplies two numbers"],
        correct: 1,
        explanation: "== is the comparison operator — it checks if two things are equal and returns True or False. Remember: = assigns (puts value in a box), while == compares (asks 'are these the same?'). This is one of the most common beginner mistakes!",
      },
      {
        question: "In an if/elif/else chain, how many blocks run if the first condition is True?",
        options: ["All of them", "None of them", "Only the first matching one", "Only the last one"],
        correct: 2,
        explanation: "Python stops at the FIRST condition that is True! Once it finds a match, it runs that block and completely skips everything else in the chain. That's what makes elif chains so efficient.",
      },
      {
        question: "What does 'and' do in a condition?",
        options: ["Both conditions must be True", "Either condition must be True", "Reverses the condition", "Adds two numbers"],
        correct: 0,
        explanation: "With 'and', BOTH conditions must be True for the whole expression to be True. Like needing BOTH a key AND a code to open a safe — one alone is not enough!",
      },
      {
        question: "What does `not True` evaluate to?",
        options: ["True", "False", "None", "Error"],
        correct: 1,
        explanation: "not flips the boolean value — `not True` becomes False, and `not False` becomes True. It's like a light switch: not flips whatever state you had. Useful for writing `if not is_logged_in:` instead of `if is_logged_in == False:`.",
      },
      {
        question: "Which condition correctly checks if age is between 13 and 17 (inclusive)?",
        options: ["if age > 13 and age < 17:", "if 13 <= age <= 17:", "if age >= 13 or age <= 17:", "if age = 13 to 17:"],
        correct: 1,
        explanation: "Python allows chained comparisons like `13 <= age <= 17` — elegant and readable! Option A would exclude 13 and 17. Option C (using or) would be True for almost any number. Option D is not valid Python syntax.",
      },
      {
        question: "What prints when score = 75?\n\nif score >= 90:\n    print('A')\nelif score >= 75:\n    print('B')\nelif score >= 60:\n    print('C')\nelse:\n    print('F')",
        options: ["A", "B", "C", "B and C"],
        correct: 1,
        explanation: "Python checks from top to bottom and stops at the FIRST True condition. score >= 90 is False. score >= 75 is True (75 >= 75) — so it prints 'B' and stops. It never even checks the C or F conditions!",
      },
      {
        question: "What is the purpose of indentation in an if statement?",
        options: ["It makes the code look nice", "It tells Python which lines belong inside the if block", "It speeds up the program", "It is optional in Python"],
        correct: 1,
        explanation: "Indentation in Python is NOT decorative — it's mandatory syntax! It tells Python exactly which lines of code belong inside the if block. Unlike other languages that use {} braces, Python uses whitespace. Get it wrong and you get an IndentationError!",
      },
    ],
    keyLearnings: [
      "if checks a condition — if True, the indented block runs; otherwise it's skipped",
      "else is the backup that runs when the if condition is False — covers all remaining cases",
      "elif chains let you check many conditions; Python runs the FIRST True one and skips the rest",
      "== compares (is this equal?); = assigns (put this value here) — never mix them up in conditions!",
      "Comparison operators: == != > < >= <= — they always return True or False",
      "'and' needs ALL conditions True; 'or' needs just ONE; 'not' flips True↔False",
      "Nested if = an if inside another if — each level needs 4 more spaces of indentation",
      "Chained comparisons: 13 <= age <= 17 is valid Python — clean and readable!",
    ],
    funFact: "Every video game uses thousands of if/else statements! When Mario jumps, the game checks: if jump_button pressed AND mario.is_on_ground → apply_jump_force(). A single second of gameplay can trigger millions of if checks! 🎮",
    nextPreview: "Day 5 is LOOPS — making Python repeat things thousands of times so you never have to copy-paste code again!",
  },

  {
    id: 5,
    title: "Loops — Magic Repetition",
    emoji: "🔄",
    tagline: "Do it once, repeat it forever!",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    duration: "Day 5",
    topics: ["For loops", "range() function", "While loops", "Nested loops", "break and continue", "enumerate()"],
    intro: "Imagine writing 'I will not talk in class' 100 times on a chalkboard. BORING! 😫 Now imagine telling Python: 'Print that 100 times' — and it finishes in a blink. ⚡ That's the magic of loops! Loops are how computers do boring repetitive work so humans don't have to. They're also how every animation, every game level, and every search engine works behind the scenes.",
    sections: [
      {
        title: "The For Loop — Count and Repeat 🔢",
        content: "A **for loop** repeats code a specific number of times, or once for each item in a sequence. Use `range()` to generate numbers. It takes 1, 2, or 3 arguments: `range(stop)`, `range(start, stop)`, or `range(start, stop, step)`. The stop value is always **excluded**.",
        code: `# range(stop) — counts from 0 up to (not including) stop
for i in range(5):
    print(i)           # 0 1 2 3 4

# range(start, stop) — most common form
for num in range(1, 6):
    print(num)         # 1 2 3 4 5

# range(start, stop, step) — step controls jump size
for n in range(0, 11, 2):
    print(n)           # 0 2 4 6 8 10   (even numbers)

# Count DOWN (negative step)
for countdown in range(5, 0, -1):
    print(f"T-minus {countdown}...")
print("🚀 BLAST OFF!")

# Print the 7 times table
print("\\n7 Times Table:")
for i in range(1, 13):
    print(f"7 × {i:2} = {7 * i}")`,
        analogy: "range() is like a staircase escalator 🏃 — you set where it starts, where it stops, and how big each step is. The for loop rides up one step at a time until it reaches the top!",
      },
      {
        title: "Looping Through Lists & Strings 📋",
        content: "The real power of for loops is iterating over **collections** — lists, strings, anything Python can step through. You don't need range() at all — just write `for item in collection`.",
        code: `# Loop through a list — no index needed!
friends = ["Aarav", "Priya", "Rohan", "Meera"]

for friend in friends:
    print(f"👋 Hello, {friend}!")

# Loop through a string — character by character
for letter in "Python":
    print(letter, end=" ")   # P y t h o n
print()

# Add up a list of prices
prices = [120, 45, 230, 89, 15]
total = 0
for price in prices:
    total += price
print(f"\\n🧾 Cart total: ₹{total}")
print(f"Average item: ₹{total / len(prices):.2f}")

# Loop + if together — filter a list
scores = [72, 95, 61, 88, 55, 91, 78]
print("\\n🏆 Students who passed (≥ 60):")
for score in scores:
    if score >= 60:
        print(f"  ✅ {score}")`,
        tip: "When you need both the **index** AND the **value** while looping, use `enumerate()` — you'll learn it in the last section today!",
      },
      {
        title: "The While Loop — Keep Going Until... ⏳",
        content: "A **while loop** repeats as long as a condition stays True. Use it when you don't know in advance how many times to loop — like waiting for the right user input, or running a game until someone wins.",
        code: `# Simple countdown
count = 5
while count > 0:
    print(f"⏱️ {count}...")
    count -= 1          # MUST update count or loop is infinite!
print("🏁 Go!")

# Accumulate until a target
savings = 0
weekly = 150
target = 1000
weeks = 0

while savings < target:
    savings += weekly
    weeks += 1

print(f"💰 Reached ₹{target} in {weeks} weeks!")

# Keep asking until valid input
secret = "mango"
guess = ""
attempts = 0

while guess != secret:
    guess = input("Guess the fruit: ")
    attempts += 1
    if guess != secret:
        print("❌ Try again!")

print(f"✅ Correct in {attempts} attempt(s)!")`,
        tip: "**Always** make sure the while condition will eventually become False — otherwise you create an **infinite loop** (your program freezes forever). Every while loop needs a line that changes the variable being checked! 🔄",
      },
      {
        title: "Nested Loops — Loops Inside Loops 🔄🔄",
        content: "You can put a loop **inside** another loop. The inner loop runs **completely** for every single step of the outer loop. This is how you print grids, tables, patterns — and it's how many games render their playing field!",
        code: `# Multiplication table grid
print("   ", end="")
for i in range(1, 6):
    print(f"{i:4}", end="")   # column headers
print()
print("   " + "────" * 5)

for row in range(1, 6):
    print(f"{row:2} │", end="")
    for col in range(1, 6):
        print(f"{row * col:4}", end="")
    print()    # newline after each row

# Star triangle pattern
print("\\nStar Triangle:")
for row in range(1, 6):
    for star in range(row):
        print("★", end=" ")
    print()
# Output:
# ★
# ★ ★
# ★ ★ ★
# ★ ★ ★ ★
# ★ ★ ★ ★ ★`,
        analogy: "Nested loops are like a clock ⏰. The outer loop is the hour hand (moves slowly). For every hour, the inner loop is the minute hand — it goes all the way from 0 to 59 before the hour hand moves once!",
      },
      {
        title: "Break and Continue — Loop Controls 🛑",
        content: "**break** exits the loop immediately — no more iterations, even if there are numbers left. **continue** skips the rest of the current iteration and jumps to the next one. Both work in for and while loops.",
        code: `# break — stop the moment we find what we want
numbers = [3, 7, 2, 9, 4, 6, 1, 8]
target = 9

for i, num in enumerate(numbers):
    if num == target:
        print(f"🎯 Found {target} at position {i}!")
        break           # stop searching — no need to continue
    print(f"  Checking {num}...")

# continue — skip certain items
print("\\nEven numbers only:")
for n in range(1, 11):
    if n % 2 != 0:
        continue        # skip odd numbers
    print(n, end=" ")   # 2 4 6 8 10
print()

# while + break — menu system
while True:             # loop forever...
    choice = input("\\nEnter 'q' to quit or any key to continue: ")
    if choice == "q":
        print("👋 Goodbye!")
        break           # ...until user quits`,
        tip: "A `while True:` loop with `break` inside is a common pattern for menus and games — it keeps running until a specific exit condition is met. Much cleaner than trying to set up a complex while condition!",
      },
      {
        title: "enumerate() — Index and Value Together 🔢✨",
        content: "When you loop through a list, Python normally gives you only the **value**. If you also need the **index (position number)**, use `enumerate()`. It pairs each item with its position, saving you from awkward `range(len(list))` code.",
        code: `fruits = ["apple", "banana", "mango", "kiwi", "grape"]

# The OLD way (clunky)
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# THE PYTHON WAY — enumerate()
print("\\n🏆 Leaderboard:")
for position, fruit in enumerate(fruits):
    print(f"  {position + 1}. {fruit}")   # start counting at 1

# enumerate with a start number
print("\\n📋 Menu (starting at 1):")
menu = ["Pizza 🍕", "Burger 🍔", "Pasta 🍝", "Salad 🥗"]
for num, item in enumerate(menu, start=1):
    print(f"  [{num}] {item}")

# Real use case — find all positions of an item
scores = [85, 92, 78, 92, 65, 92]
print("\\n92 appears at positions:", end=" ")
for idx, score in enumerate(scores):
    if score == 92:
        print(idx, end=" ")   # 1 3 5`,
        tip: "`enumerate(my_list, start=1)` lets you start counting from 1 instead of 0 — perfect for numbered lists, menus, and leaderboards where you don't want to show 0-indexed positions to users!",
      },
    ],
    challenge: {
      title: "Your Mission: Pattern Printer + FizzBuzz 🎯",
      description: "Two challenges in one! Part 1: Print a diamond star pattern using nested loops. Part 2: Write FizzBuzz — the most famous coding interview question ever. Both must use loops correctly!",
      code: `# PART 1: STAR STAIRCASE using nested loops
print("=== STAR STAIRCASE ===")
rows = 5
for row in range(1, rows + 1):
    for star in range(row):
        print("★", end=" ")
    print()    # newline

# PART 2: FIZZBUZZ — the classic challenge!
# Rules: 1 to 30
# → Divisible by 3: print "Fizz"
# → Divisible by 5: print "Buzz"
# → Divisible by BOTH 3 and 5: print "FizzBuzz"
# → Otherwise: print the number
print("\\n=== FIZZBUZZ (1 to 30) ===")
for n in range(1, 31):
    if n % 3 == 0 and n % 5 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)`,
    },

    debugChallenge: {
      title: "Debug Zone 🐛 — Fix the Loop Bugs",
      description: "Three loops, three bugs. A multiplication table uses the wrong operator, a star pattern is missing a colon, and a countdown is counting UP instead of down. Fix all three!",
      brokenCode: `# === BUG 1: Multiplication table ===
print("8 Times Table:")
for i in range(1, 11):
    result = 8 + i          # Bug 1
    print(f"8 x {i} = {result}")

# === BUG 2: Star staircase ===
print("\\nStar Staircase:")
for row in range(1, 6):
    for star in range(row)  # Bug 2
        print("★", end=" ")
    print()

# === BUG 3: Countdown ===
print("\\nCountdown:")
count = 5
while count > 0:
    print(f"T-minus {count}...")
    count += 1              # Bug 3
print("🚀 Liftoff!")`,
      expectedOutputDescription:
        "The 8 times table (8×1=8 through 8×10=80), a star staircase triangle, and a countdown from 5 to 1 followed by 🚀 Liftoff!",
      hint: "Check: (1) which operator gives multiplication, (2) what punctuation ends every for/while line, (3) should the countdown go up or down?",
      bugs: [
        {
          must: "result = 8 * i",
          hint: "Bug 1: `8 + i` adds instead of multiplying! For a times table you need the * operator: `result = 8 * i`",
        },
        {
          must: "for star in range(row):",
          hint: "Bug 2: Every for/while statement MUST end with a colon (:). Missing it gives a SyntaxError. Add the colon: `for star in range(row):`",
        },
        {
          must: "count -= 1",
          hint: "Bug 3: `count += 1` makes count go UP forever — an infinite loop! For a countdown you need to subtract: `count -= 1`",
        },
      ],
    },

    blankChallenge: {
      title: "Your Turn! ✍️ — Build a Number Analyser",
      task: `Write a Python program from scratch that analyses a list of numbers. It must:
1. Create a list of at least 8 numbers (mix of different values)
2. Use a loop to find: total sum, count of even numbers, count of odd numbers, largest value, smallest value
3. Print a formatted analysis report using f-strings
4. BONUS: Use another loop to print a "histogram" — for each number, print that many ★ symbols in a row
Example: 5 → ★ ★ ★ ★ ★`,
      validationGoal:
        "The output should show a list of numbers, then a report with sum, even count, odd count, max, and min — all calculated with loops (not built-in functions like sum() or max()). The maths must be correct and the output formatted neatly.",
      starterComment: `# 📊 NUMBER ANALYSER — write from scratch!
# Hints:
# - Start with: numbers = [23, 7, 45, 12, 67, 4, 89, 31]
# - total = 0, then total += num inside the loop
# - Use num % 2 == 0 to check if even
# - Track largest/smallest by comparing with a running max/min variable

`,
    },

    quiz: [
      {
        question: "What does range(1, 5) produce?",
        options: ["1, 2, 3, 4, 5", "1, 2, 3, 4", "0, 1, 2, 3, 4", "2, 3, 4, 5"],
        correct: 1,
        explanation: "range(1, 5) starts at 1 and stops BEFORE 5, producing 1, 2, 3, 4. The stop value is always excluded. This trips up beginners constantly — if you want to include 5, write range(1, 6)!",
      },
      {
        question: "Which loop is best when you don't know how many times to repeat?",
        options: ["for loop", "while loop", "nested loop", "enumerate loop"],
        correct: 1,
        explanation: "while loops keep running as long as a condition is True, so they're perfect when you don't know in advance how many repeats you need — like waiting for correct user input, or running a game until someone wins.",
      },
      {
        question: "What does 'break' do inside a loop?",
        options: ["Pauses the loop for 1 second", "Skips the current iteration and continues", "Exits the loop immediately", "Restarts the loop from the beginning"],
        correct: 2,
        explanation: "break immediately exits the entire loop — no more iterations, even if there are numbers left in range(). The code after the loop continues running normally. It's like an emergency exit button!",
      },
      {
        question: "What does range(0, 10, 2) produce?",
        options: ["0, 2, 4, 6, 8, 10", "0, 2, 4, 6, 8", "2, 4, 6, 8, 10", "1, 3, 5, 7, 9"],
        correct: 1,
        explanation: "range(0, 10, 2) starts at 0, goes up by steps of 2, and stops before 10. Result: 0, 2, 4, 6, 8. The step=2 makes it skip every other number — perfect for generating even numbers!",
      },
      {
        question: "In a nested loop like:\nfor i in range(3):\n    for j in range(4):\n        print('x')\nHow many times does 'x' print?",
        options: ["3", "4", "7", "12"],
        correct: 3,
        explanation: "The inner loop runs 4 times for EACH iteration of the outer loop. Outer runs 3 times × inner runs 4 times = 12 total. This is why nested loops can get expensive quickly — multiply the iteration counts!",
      },
      {
        question: "What does 'continue' do inside a loop?",
        options: ["Exits the loop completely", "Skips the rest of the current iteration and goes to the next", "Starts the loop over from the beginning", "Pauses execution"],
        correct: 1,
        explanation: "continue skips the remaining code in the CURRENT iteration and jumps straight to the next one. Unlike break which exits the whole loop, continue just skips one step. Great for filtering — skip items you don't want to process!",
      },
      {
        question: "What does enumerate(['a', 'b', 'c']) give you?",
        options: ["Just the values: a, b, c", "Just the indices: 0, 1, 2", "Pairs of (index, value): (0,'a'), (1,'b'), (2,'c')", "The length of the list: 3"],
        correct: 2,
        explanation: "enumerate() pairs each item with its position number, giving you (0,'a'), (1,'b'), (2,'c'). Use it like: `for i, val in enumerate(my_list):` — now you have both the index and value without needing range(len(list))!",
      },
    ],
    keyLearnings: [
      "for loops repeat a fixed number of times — use range(start, stop, step) to control them",
      "range(1, 6) produces 1,2,3,4,5 — stop is always EXCLUDED; range(5, 0, -1) counts down",
      "for item in my_list: loops through every item without needing an index",
      "while loops run as long as a condition stays True — always update the condition variable!",
      "Nested loops multiply: outer × inner = total iterations (3 × 4 = 12 prints)",
      "break exits the loop immediately; continue skips the current step and goes to the next",
      "enumerate(list) gives you (index, value) pairs — cleaner than range(len(list))",
      "while True: + break inside is the standard pattern for menus and game loops",
    ],
    funFact: "FizzBuzz is the #1 coding interview warm-up question used by companies worldwide — including Google and Microsoft. Studies show 40% of people who apply for programming jobs can't solve it! Now you can. 🏆",
    nextPreview: "Day 6: Lists — the ultimate data container that holds entire collections of things in one variable!",
  },

  {
    id: 6,
    title: "Lists — Collections of Things",
    emoji: "📋",
    tagline: "Store many things in one place!",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    duration: "Day 6",
    topics: ["Creating lists", "Indexing and slicing", "Adding and removing", "Loops with lists", "Sorting and methods", "List comprehensions"],
    intro: "Imagine needing a separate variable for every item in your shopping list: item1, item2, item3... by item50. That would be chaos! 😱 Python **lists** let you store MANY items in ONE variable, access any of them instantly by position, loop through all of them, sort them, filter them, and transform them. Lists are the backbone of Python — nearly every real program uses them. Today you'll master them completely.",
    sections: [
      {
        title: "Creating and Reading Lists 🚂",
        content: "Lists use square brackets `[]` with commas between items. They can hold **any data type** — strings, numbers, booleans, or even other lists. `len()` tells you how many items there are.",
        code: `# Creating lists
fruits = ["apple", "banana", "mango", "kiwi"]
scores = [95, 87, 78, 92, 88]
mixed  = ["Priya", 12, True, 3.14]
empty  = []                         # empty list — add items later

# Print the whole list
print(fruits)           # ['apple', 'banana', 'mango', 'kiwi']
print(f"Length: {len(fruits)}")     # Length: 4

# Lists can be nested (a list of lists!)
grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(grid[1])          # [4, 5, 6] — second row
print(grid[1][2])       # 6 — row 1, column 2

# Useful: quickly create a list of numbers
tens = list(range(0, 101, 10))
print(tens)             # [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]`,
        analogy: "A list is like a numbered train 🚂. Carriage 0 is the first one, carriage 1 is second... You can look in any carriage instantly, add a new carriage at the back, or remove one. The train gets longer as you add more!",
      },
      {
        title: "Indexing and Slicing 🔍",
        content: "Access any item with its **index** in square brackets. Python starts at **0**, not 1. Use **negative indices** to count from the end. Use **slicing** `[start:stop]` to grab a chunk of the list.",
        code: `planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter"]
#  index:      0          1        2        3        4
# neg index:  -5         -4       -3       -2       -1

# Positive indexing (from start)
print(planets[0])     # Mercury — first
print(planets[2])     # Earth   — third
print(planets[4])     # Jupiter — fifth

# Negative indexing (from end — very handy!)
print(planets[-1])    # Jupiter — last
print(planets[-2])    # Mars    — second to last

# Slicing [start:stop] — stop is excluded
print(planets[1:4])   # ['Venus', 'Earth', 'Mars']
print(planets[:3])    # ['Mercury', 'Venus', 'Earth'] — from beginning
print(planets[2:])    # ['Earth', 'Mars', 'Jupiter']  — to the end
print(planets[::2])   # ['Mercury', 'Earth', 'Jupiter'] — every 2nd item`,
        tip: "**my_list[-1]** is the Pythonic way to get the last item — it always works regardless of how long the list is. Much better than `my_list[len(my_list)-1]`!",
      },
      {
        title: "Changing Lists — Add, Remove, Update 🔧",
        content: "Lists are **mutable** — you can change them after creating them. This is what separates them from strings (which are immutable). Use these methods to keep your lists up to date.",
        code: `shopping = ["milk", "bread", "eggs"]

# ADD items
shopping.append("butter")       # add to END
shopping.insert(1, "juice")     # insert at index 1
print(shopping)  # ['milk', 'juice', 'bread', 'eggs', 'butter']

# REMOVE items
shopping.remove("bread")        # remove by VALUE (first match)
popped = shopping.pop()         # remove and return LAST item
popped_idx = shopping.pop(0)    # remove and return item at index 0
print(shopping)  # ['juice', 'eggs']

# UPDATE an item
shopping[0] = "oat milk"
print(shopping)  # ['oat milk', 'eggs']

# CHECK membership
print("eggs" in shopping)       # True
print("bread" in shopping)      # False
print(shopping.count("eggs"))   # 1 — how many times?

# COMBINE two lists
extras = ["chocolate", "chips"]
full_list = shopping + extras   # creates a new combined list
shopping.extend(extras)         # adds extras directly into shopping
print(shopping)`,
      },
      {
        title: "Loops + Lists — The Power Combo ⚡",
        content: "Lists and loops were made for each other. Loop through a list to process every item, build new lists from old ones, filter items, and calculate summaries. This pattern appears in virtually every Python program.",
        code: `# Build a leaderboard from scores
names  = ["Arjun", "Priya", "Rohan", "Meera", "Dev"]
scores = [85, 92, 78, 95, 88]

# Print formatted leaderboard
print("🏆 LEADERBOARD")
print("-" * 25)
for i, name in enumerate(names):
    bar = "█" * (scores[i] // 10)   # visual bar
    print(f"  {i+1}. {name:<8} {scores[i]:3}  {bar}")

# Filter — collect only passing scores
passing = []
for score in scores:
    if score >= 80:
        passing.append(score)
print(f"\\nPassing scores: {passing}")

# Calculate average manually
total = 0
for score in scores:
    total += score
average = total / len(scores)
print(f"Class average: {average:.1f}")

# Find the top scorer
top_score = scores[0]
top_name  = names[0]
for i in range(len(scores)):
    if scores[i] > top_score:
        top_score = scores[i]
        top_name  = names[i]
print(f"Top scorer: {top_name} with {top_score}")`,
        analogy: "Loops + lists are like a factory conveyor belt 🏭. Each item on the belt (list) goes through the machine (loop). Some items get modified, some get sorted into boxes, some get discarded — but every item gets checked!",
      },
      {
        title: "Sorting and Powerful List Methods 📊",
        content: "Python's built-in list tools let you sort, search, count, sum and reverse lists in one line. Know these methods and you'll solve most list problems instantly.",
        code: `scores = [78, 95, 62, 88, 71, 99, 55, 84]

# Sorting
scores.sort()                    # sort IN PLACE (modifies original)
print("Ascending:", scores)      # [55, 62, 71, 78, 84, 88, 95, 99]

scores.sort(reverse=True)        # descending
print("Descending:", scores)     # [99, 95, 88, 84, 78, 71, 62, 55]

sorted_copy = sorted(scores)     # returns NEW sorted list (original unchanged)

# Stats — one-liners!
print(f"Highest: {max(scores)}")
print(f"Lowest:  {min(scores)}")
print(f"Total:   {sum(scores)}")
print(f"Average: {sum(scores)/len(scores):.1f}")

# Other useful methods
fruits = ["mango", "apple", "banana", "apple", "kiwi"]
print(fruits.count("apple"))     # 2 — how many times?
print(fruits.index("banana"))    # 2 — position of first match

fruits.reverse()                 # reverse in place
print(fruits)

fruits2 = fruits.copy()          # make an independent copy
fruits2.clear()                  # empty the copy (original unchanged)
print(fruits)                    # still has items!`,
        tip: "`.sort()` changes the list itself (in-place). `sorted()` returns a brand-new sorted list and leaves the original alone. Use `sorted()` when you want to keep the original order!",
      },
      {
        title: "List Comprehensions — Python's Magic Shortcut ✨",
        content: "List comprehensions are a beautiful Python feature that creates a new list from an existing one **in a single line**. They replace the common 'create empty list, loop, append' pattern with something much more elegant. Professional Python developers use them constantly!",
        code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# OLD way: loop + append
squares_old = []
for n in numbers:
    squares_old.append(n ** 2)

# NEW way: list comprehension (same result, one line!)
squares = [n ** 2 for n in numbers]
print(squares)   # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# With a condition — filter AND transform!
even_squares = [n ** 2 for n in numbers if n % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]

# Practical examples
names = ["  alice  ", "BOB", "  Charlie"]
clean = [name.strip().title() for name in names]
print(clean)     # ['Alice', 'Bob', 'Charlie']

prices = [100, 250, 80, 320, 150]
discounted = [p * 0.9 for p in prices if p > 100]
print(discounted)  # [225.0, 288.0, 135.0]

# Syntax: [expression  for  item  in  collection  if  condition]
#               ↑                                       ↑
#           what to do                           optional filter`,
        tip: "List comprehensions read like English: `[n**2 for n in numbers if n > 5]` = 'give me n-squared for each n in numbers, but only if n is greater than 5'. Once you get used to them, you'll use them everywhere! 🚀",
      },
    ],
    challenge: {
      title: "Your Mission: The Class Report Generator 📊",
      description: "Build a complete class grade report! Use a list of students and scores, then generate statistics, a sorted leaderboard, pass/fail analysis, and a visual bar chart — all using loops, list methods, and f-strings.",
      code: `# 📊 CLASS REPORT GENERATOR
students = ["Arjun", "Priya", "Rohan", "Meera", "Dev", "Anaya", "Kabir"]
scores   = [85,      92,      67,      95,       78,    88,      72]

PASS_MARK = 75

print("=" * 40)
print("       CLASS PERFORMANCE REPORT")
print("=" * 40)

# 1. Print all students with pass/fail
print("\\n📋 Student Results:")
for i, name in enumerate(students):
    status = "✅ Pass" if scores[i] >= PASS_MARK else "❌ Fail"
    bar = "█" * (scores[i] // 10)
    print(f"  {name:<8} {scores[i]:3}/100  {bar} {status}")

# 2. Statistics
total = sum(scores)
average = total / len(scores)
print(f"\\n📈 Statistics:")
print(f"  Class average : {average:.1f}")
print(f"  Highest score : {max(scores)} ({students[scores.index(max(scores))]})")
print(f"  Lowest score  : {min(scores)} ({students[scores.index(min(scores))]})")

# 3. Sorted leaderboard
paired = list(zip(students, scores))
paired.sort(key=lambda x: x[1], reverse=True)
print("\\n🏆 Leaderboard:")
for rank, (name, score) in enumerate(paired, 1):
    print(f"  #{rank}  {name:<8} — {score}")`,
    },

    debugChallenge: {
      title: "Debug Zone 🐛 — Fix the Shopping Cart",
      description: "A shopping cart calculator has 3 bugs: items are numbered from 0 instead of 1, the total isn't accumulating correctly, and an elif is missing its condition. Fix them all!",
      brokenCode: `# Shopping Cart Calculator — fix 3 bugs!
items  = ["Notebook", "Pen", "Ruler", "Eraser"]
prices = [45, 10, 25, 5]

print("🛒 YOUR CART:")
for i in range(len(items)):
    print(f"  {i}. {items[i]:<12} ₹{prices[i]}")  # Bug 1

total = 0
for price in prices:
    total = price                   # Bug 2

print(f"\\nSubtotal: ₹{total}")

discount = total * 0.10
if total >= 60:
    print(f"🎉 10% discount applied! You save ₹{discount:.0f}")
    print(f"Final total: ₹{total - discount:.0f}")
elif:                               # Bug 3
    print("Add more items to qualify for a discount!")`,
      expectedOutputDescription:
        "A numbered cart starting at 1, a correct subtotal of 85, a 10% discount message showing ₹8 saved and final total ₹77.",
      hint: "Look for: (1) the item numbering should start at 1 not 0, (2) += vs = for accumulating a total, (3) elif needs a condition after it — or should it be else?",
      bugs: [
        {
          must: "{i+1}.",
          hint: "Bug 1: `{i}.` prints 0, 1, 2, 3 — customers expect 1, 2, 3, 4! Change it to `{i+1}.` so the numbering starts at 1.",
        },
        {
          must: "total += price",
          hint: "Bug 2: `total = price` replaces total with just the latest price each time — so you end up with only the last item's price! Use `total += price` to ADD each price to the running total.",
        },
        {
          must: "else:",
          hint: "Bug 3: `elif:` without a condition is a SyntaxError. Since there's no other condition to check (it's either above ₹60 or not), use `else:` as the catch-all.",
        },
      ],
    },

    blankChallenge: {
      title: "Your Turn! ✍️ — Build a Playlist Manager",
      task: `Write a Python playlist manager from scratch. It must:
1. Create a list of at least 6 song titles
2. Print the full playlist with numbering (starting at 1)
3. Add a new song at the end and another at position 2
4. Remove one song by name
5. Sort the playlist alphabetically and print the sorted version
6. Use a list comprehension to create a new list of only songs whose title is longer than 5 characters
7. Print a summary: total songs, longest title, shortest title`,
      validationGoal:
        "The output should show the original playlist numbered from 1, then demonstrate adding/removing songs, then a sorted playlist, then a filtered list from comprehension, and finally a summary with count and title lengths. All list operations must work correctly.",
      starterComment: `# 🎵 PLAYLIST MANAGER — write from scratch!
# Hints:
# - Start: songs = ["Shape of You", "Blinding Lights", ...]
# - Use append(), insert(), remove(), sort()
# - List comprehension: [s for s in songs if len(s) > 5]
# - max(songs, key=len) finds the longest string in the list

`,
    },

    quiz: [
      {
        question: "What is the index of the FIRST item in a Python list?",
        options: ["1", "0", "-1", "It depends on the list"],
        correct: 1,
        explanation: "Python lists ALWAYS start at index 0! So the first item is at [0], the second at [1], and so on. This is called 'zero-based indexing' and is standard in most programming languages. The last item is always at [len(list)-1] or simply [-1].",
      },
      {
        question: "What does list.append(\"mango\") do?",
        options: ["Removes mango from the list", "Adds mango to the BEGINNING of the list", "Adds mango to the END of the list", "Finds mango in the list"],
        correct: 2,
        explanation: "append() ALWAYS adds to the END of the list — like joining the back of a queue. If you want to add at a specific position, use insert(index, value). For example, list.insert(0, 'mango') adds to the very beginning!",
      },
      {
        question: "What does len([\"a\", \"b\", \"c\"]) return?",
        options: ["2", "3", "4", "abc"],
        correct: 1,
        explanation: "len() counts the number of items in the list. [\"a\", \"b\", \"c\"] has 3 items, so len() returns 3. len() works on strings too — len(\"hello\") returns 5.",
      },
      {
        question: "Given fruits = [\"apple\", \"banana\", \"mango\", \"kiwi\"], what does fruits[-1] return?",
        options: ["apple", "banana", "mango", "kiwi"],
        correct: 3,
        explanation: "Negative indexing counts from the END of the list. -1 is always the last item. fruits[-1] = 'kiwi'. fruits[-2] = 'mango'. This is much cleaner than writing fruits[len(fruits)-1] every time!",
      },
      {
        question: "What is the difference between .sort() and sorted()?",
        options: [".sort() returns a new list; sorted() modifies the original", "They are identical", ".sort() modifies the list in place; sorted() returns a new sorted list", "sorted() only works with numbers"],
        correct: 2,
        explanation: ".sort() modifies the original list IN PLACE and returns None. sorted() leaves the original unchanged and RETURNS a new sorted list. Use sorted() when you need to keep the original order, .sort() when you're done with the original.",
      },
      {
        question: "What does this list comprehension produce?\n[x * 2 for x in range(1, 5)]",
        options: ["[1, 2, 3, 4]", "[2, 4, 6, 8]", "[2, 4, 6, 8, 10]", "[1, 4, 9, 16]"],
        correct: 1,
        explanation: "range(1, 5) gives 1, 2, 3, 4. The comprehension doubles each: 1×2=2, 2×2=4, 3×2=6, 4×2=8. Result: [2, 4, 6, 8]. List comprehensions follow the pattern: [expression for item in iterable].",
      },
      {
        question: "What does 'eggs' in ['milk', 'eggs', 'bread'] return?",
        options: ["1 (the index)", "True", "False", "'eggs'"],
        correct: 1,
        explanation: "The 'in' operator checks if an item EXISTS in a list and returns True or False — not the index! It's perfect for membership tests in if statements: `if 'eggs' in shopping:`. To get the index, use list.index('eggs').",
      },
    ],
    keyLearnings: [
      "A list stores many items in one variable: fruits = ['apple', 'banana', 'mango']",
      "Lists start at index 0 — first item is list[0], last is list[-1]",
      "Slicing grabs a chunk: list[1:4] gives items at index 1, 2, 3 (4 is excluded)",
      "append() adds to the end; insert(i, x) adds at position i; remove(x) deletes by value",
      "sort() changes the list in place; sorted() returns a new sorted copy",
      "len(), sum(), max(), min() — one-liners for common calculations",
      "Loop pattern: for item in my_list; for i, item in enumerate(my_list)",
      "List comprehension: [expr for item in list if condition] — elegant one-line filtering",
    ],
    funFact: "Python lists are technically dynamic arrays — they automatically grow as you add items. Spotify's 'Liked Songs' playlist, YouTube's recommended videos, and Instagram's feed are all built on list-like data structures. Your morning algorithm is basically a Python list! 🎵",
    nextPreview: "Up next: Bonus Setup Module — get Google Colab and Replit running so you can write real Python beyond the browser!",
  },

  {
    id: 6.5,
    title: "Your Real Python Toolkit",
    emoji: "🛠️",
    tagline: "Set up Google Colab & Replit — code like a pro!",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    duration: "Bonus",
    topics: ["Why you need real tools", "Google Colab walkthrough", "Notebook cells & markdown", "Replit for interactive programs", "Moving your camp code"],
    intro: "You've built real Python programs inside this platform — variables, loops, lists, decisions. Amazing work! 🎉 But our in-browser playground has limits. It can't install libraries, can't make charts, can't save your work, and struggles with longer programs. Time to upgrade to the tools that real Python developers use every day. The great news: both tools are completely FREE and run in your browser — no installation needed!",
    sections: [
      {
        title: "Why You Need Real Tools Now 🚀",
        content: "Our built-in playground is perfect for learning — it runs Python instantly without any setup. But from Module 7 onwards you'll write longer programs, use libraries like `random`, `turtle`, and `matplotlib`, and build actual projects. Here's what real tools unlock:",
        code: `# Things you CAN'T do in our browser playground:

# 1. Install libraries
import matplotlib.pyplot as plt   # make charts!
import random                      # real randomness
import turtle                      # draw graphics

# 2. Save your work permanently
# (browser playground resets every session)

# 3. Run programs that take user input reliably
name = input("What's your name? ")   # works better in Replit

# 4. Write programs longer than ~50 lines comfortably

# 5. Share your work with your teacher
# (Colab notebooks have shareable links!)

print("Time to level up! 🚀")`,
        analogy: "Our browser playground is like training wheels on a bike 🚲 — brilliant for learning, but once you can balance, you switch to a real bike. Google Colab and Replit are your real bikes. Same Python, way more power!",
      },
      {
        title: "Google Colab — Your Cloud Python Lab ☁️",
        content: "**Google Colab** (Colaboratory) is a free tool from Google that lets you write and run Python in your browser, saves everything to your Google Drive, and comes with hundreds of libraries pre-installed. Data scientists at NASA, Google, and hospitals use it every day.",
        code: `# What makes Colab special:

# ✅ Completely FREE
# ✅ Nothing to install — works in Chrome/Firefox/Safari
# ✅ Saves automatically to Google Drive
# ✅ 500+ libraries pre-installed (numpy, pandas, matplotlib...)
# ✅ You can share your notebook link — like a Google Doc for code
# ✅ Runs on Google's computers — not yours
# ✅ Supports rich text, images, and headings alongside code

# How to open Colab:
# 1. Go to: colab.research.google.com
# 2. Sign in with your Google account
# 3. Click "New Notebook"
# 4. You're ready to code!

# The URL of every Colab notebook looks like:
# colab.research.google.com/drive/1ABC...XYZ
# Share this link with Manisha so she can see your work! 📤`,
        tip: "Bookmark **colab.research.google.com** right now! Every notebook auto-saves to Google Drive in a folder called 'Colab Notebooks'. You can also open it from Google Drive → New → More → Google Colaboratory.",
      },
      {
        title: "Inside a Colab Notebook — Cells 📓",
        content: "A Colab notebook is made of **cells** — individual blocks you can run one at a time. There are two types: **Code cells** (Python code) and **Text cells** (formatted notes using Markdown). This is the key difference from our playground — you can build up a program step by step, running each piece and seeing output immediately.",
        code: `# ── HOW TO USE COLAB CELLS ──────────────────────────

# RUNNING a cell:
#   Click the ▶ play button on the left of the cell
#   OR press Shift + Enter (runs cell and moves to next)
#   OR press Ctrl + Enter (runs cell and stays)

# ADDING a new cell:
#   Click "+ Code" or "+ Text" in the toolbar
#   OR hover between cells — buttons appear

# KEYBOARD SHORTCUTS (learn these — they save time!):
#   Shift + Enter  → Run cell, go to next
#   Ctrl + Enter   → Run cell, stay here
#   Ctrl + M + B   → Insert code cell below
#   Ctrl + M + A   → Insert code cell above
#   Ctrl + M + D   → Delete current cell

# TEXT CELL MARKDOWN (makes your notebook readable):
# # Big heading
# ## Smaller heading
# **bold text**
# *italic text*
# - bullet point
# You write this in a Text cell and it renders beautifully!

print("Each cell runs independently — try it!")
print("Variables from earlier cells are remembered 🧠")`,
        analogy: "A Colab notebook is like a science lab report 🔬 — you write your hypothesis (text cell), run the experiment (code cell), see the results below, then write your conclusion (text cell). Each experiment is separate but they share the same lab bench (memory)!",
      },
      {
        title: "Replit — For Interactive Programs 💻",
        content: "**Replit** is your go-to for programs that need `input()` — asking the user to type things. It's also great for multi-file projects, building games, and programs that run continuously. Think of it as a mini online IDE (code editor) that runs your code in a real terminal.",
        code: `# When to use REPLIT vs COLAB:

# Use REPLIT when your program:
# ✅ Has lots of input() calls (text adventures, quizzes)
# ✅ Is a game or runs in a loop waiting for user
# ✅ Needs a real terminal feel
# ✅ Has multiple Python files
# ✅ You want to share a running program (not just a notebook)

# Use COLAB when your program:
# ✅ Works with lists, data, calculations
# ✅ Makes charts or graphs (matplotlib)
# ✅ Is a step-by-step analysis or project
# ✅ You want to show work + explanation together
# ✅ You're sharing code for teacher to review

# HOW TO SET UP REPLIT:
# 1. Go to: replit.com
# 2. Click "Sign Up" (use Google account — easiest)
# 3. Click "+ Create Repl"
# 4. Choose "Python" as language
# 5. Give it a name (e.g. "CodersBee-Day5")
# 6. Click "Create Repl"
# 7. Type your code in the left panel, click Run ▶

print("Replit gives you a real terminal on the right →")
name = input("What's your name? ")   # This works perfectly in Replit!
print(f"Hello, {name}! 🎉")`,
        tip: "Replit saves your code automatically and gives every project a unique URL like `replit.com/@YourName/ProjectName`. You can share this link and anyone can see (and even fork) your project. It's like GitHub for beginners! 🌐",
      },
      {
        title: "Moving Your Camp Code to Real Tools ↗️",
        content: "The Python you've learned here works **identically** in Colab and Replit — no changes needed! Just copy and paste. There are a few small differences to know about, but nothing that will break your code.",
        code: `# ── THINGS THAT WORK IDENTICALLY ──────────────────
# ✅ All variables, strings, numbers, booleans
# ✅ All operators (+ - * / // % **)
# ✅ All if/elif/else logic
# ✅ All for and while loops
# ✅ All list operations
# ✅ print() and f-strings
# ✅ All string methods (.upper(), .split(), etc.)

# ── SMALL DIFFERENCES TO KNOW ──────────────────────

# 1. input() — works perfectly in Replit and Colab
#    (In our browser playground it needed the special handler)
name = input("Enter your name: ")    # Just works! ✅

# 2. In Colab — run cells in ORDER (top to bottom)
#    Variables from a cell only exist after you run that cell

# 3. In Colab — if you restart the runtime (Runtime menu),
#    ALL variables reset. You need to re-run cells from the top.

# 4. You can install new libraries in Colab with:
!pip install library_name           # run this in a code cell

# 5. Import libraries at the TOP of your first code cell
import random
import math

# ── COPY THIS TEST TO COLAB RIGHT NOW ──────────────
import random
number = random.randint(1, 100)
print(f"🎲 Random number: {number}")
print("If you see this — Colab is working! 🎉")`,
        tip: "Start every Colab session by running ALL cells from the top using **Runtime → Run all** (Ctrl+F9). This ensures all your variables are set up correctly before you work on specific cells.",
      },
    ],
    challenge: {
      title: "Setup Challenge 🏆 — Get Both Tools Running",
      description: "This challenge is different — no coding puzzles, just real setup! Complete all 5 steps to earn your 'Real Python Developer' badge. Screenshot each step and share with Manisha on WhatsApp.",
      code: `# ════════════════════════════════════════════
#   SETUP CHALLENGE — Your checklist:
# ════════════════════════════════════════════

# STEP 1: Open Google Colab
# → Go to: colab.research.google.com
# → Sign in with Google
# → Click "New Notebook"

# STEP 2: Run your first Colab cell
# → Copy the code below into a Colab code cell
# → Press Shift+Enter to run it

my_name = "___"          # put your name here!
my_age = ___             # put your age here!
my_favourite_language = "Python 🐍"

print("=" * 40)
print(f"  👋 Hello from Google Colab!")
print(f"  Name    : {my_name}")
print(f"  Age     : {my_age}")
print(f"  Language: {my_favourite_language}")
print("=" * 40)
print("✅ Colab is working! I'm a real Python dev now!")

# STEP 3: Add a Text cell above your code
# → Click the "+ Text" button
# → Write: "# My First Colab Notebook"
# → Write: "This is my Python camp notebook by [Your Name]"

# STEP 4: Share your notebook
# → Click Share (top right)
# → Change to "Anyone with the link can view"
# → Copy the link and send to Manisha on WhatsApp! 📤

# STEP 5: Set up Replit
# → Go to: replit.com
# → Sign up with Google
# → Create a Python repl called "CodersBee-Camp"
# → Paste the code above and press Run ▶`,
    },

    quiz: [
      {
        question: "What is a 'cell' in Google Colab?",
        options: ["A spreadsheet cell like in Excel", "An individual block of code or text that you can run independently", "A type of variable", "A folder in Google Drive"],
        correct: 1,
        explanation: "A cell is the building block of a Colab notebook. Code cells contain Python code you can run with Shift+Enter. Text cells contain formatted notes using Markdown. Each cell can be run independently, but they all share the same memory (variables from one cell are available in others).",
      },
      {
        question: "What is the keyboard shortcut to run a Colab cell and move to the next one?",
        options: ["Ctrl + Enter", "Shift + Enter", "Alt + Enter", "Tab + Enter"],
        correct: 1,
        explanation: "Shift + Enter runs the current cell AND moves focus to the next cell — the fastest way to work through a notebook. Ctrl + Enter runs the cell but stays on it. Learn Shift + Enter and you'll fly through Colab! ⚡",
      },
      {
        question: "When is Replit a better choice than Google Colab?",
        options: ["When making charts and graphs", "When writing programs that need lots of input() from the user", "When sharing a step-by-step analysis", "When working with large datasets"],
        correct: 1,
        explanation: "Replit shines for interactive programs — anything with lots of input() calls, text adventure games, quiz programs. It gives you a real terminal where the user can type naturally. Colab is better for analysis, charts, and notebook-style learning.",
      },
      {
        question: "What happens to variables in Colab if you restart the runtime?",
        options: ["They are saved automatically", "They are deleted — you must re-run all cells", "They move to Google Drive", "Nothing changes"],
        correct: 1,
        explanation: "When you restart the runtime (Runtime → Restart runtime), ALL variables in memory are wiped clean. It's like turning your computer off. To get back to where you were, run all cells from the top again using Runtime → Run all (Ctrl+F9).",
      },
      {
        question: "How do you install a new library in Google Colab?",
        options: ["Download it from the internet manually", "Run !pip install library_name in a code cell", "Go to Settings → Libraries", "You can't — only pre-installed libraries work"],
        correct: 1,
        explanation: "In Colab, run `!pip install library_name` in a code cell (the ! means 'run this as a terminal command'). For example: `!pip install emoji` installs the emoji library. Hundreds of popular libraries like matplotlib, numpy, and pandas are already pre-installed — no pip needed!",
      },
    ],
    keyLearnings: [
      "Google Colab is a free, cloud-based Python notebook — no installation, saves to Google Drive",
      "Colab notebooks are made of cells: Code cells run Python, Text cells show formatted notes",
      "Shift+Enter runs a cell and moves to the next one — learn this shortcut!",
      "Replit is better for interactive programs with lots of input() — it has a real terminal",
      "All the Python you learned in this camp works identically in Colab and Replit",
      "Share your Colab notebook link so Manisha can review your code — like a Google Doc",
      "Restart runtime = all variables reset; use Runtime → Run all to rebuild your session",
      "!pip install library_name in a Colab cell installs any Python library instantly",
    ],
    funFact: "Google Colab was built for machine learning researchers and is used to train AI models — including some of the AI systems that power Google Search and Google Translate. When you open a Colab notebook, you're using the same tool that world-class AI researchers use every day! 🤖",
    nextPreview: "Day 7: Functions — write your own reusable Python commands and stop copy-pasting code forever!",
  },

  {
    id: 7,
    title: "Functions — Your Own Commands",
    emoji: "🎯",
    tagline: "Write once, use forever!",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    duration: "Day 7",
    topics: ["Defining functions", "Parameters & arguments", "Return values", "Default parameters", "Functions calling functions", "Real-world patterns"],
    intro: "You've been using Python's built-in commands like print() and len(). But what if you want to create your OWN commands? Functions let you package up code and give it a name. Then you can use it over and over — like saving a LEGO creation and being able to copy it whenever you want! Today you'll build functions that are so useful, you'll never want to code without them. 🏗️",
    sections: [
      {
        title: "Creating a Function — def 🏗️",
        content: "Use the def keyword (short for 'define') to create a function. Then call it by writing its name with parentheses!",
        code: `# Define the function
def say_hello():
    print("Hello there! 👋")
    print("Welcome to my Python program!")
    print("I hope you're having a great day!")

# Call (use) the function — as many times as you want!
say_hello()
say_hello()
say_hello()

# Without a function, you'd have to write those
# 3 print lines THREE TIMES = 9 lines total!
# With a function: just 3 lines + call it 3 times!`,
        analogy: "A function is like a recipe 📖. You write the recipe once (how to make pancakes), then you can cook pancakes any time just by following it. You don't rewrite the recipe every time!",
      },
      {
        title: "Parameters — Customise Your Function 🎛️",
        content: "Parameters let you pass information INTO a function, making it flexible. Like a pancake recipe that works for any number of pancakes!",
        code: `# Function with a parameter
def greet_player(name):
    print("Welcome to the game, " + name + "! 🎮")
    print("Good luck, " + name + "!")

# Call with different arguments
greet_player("Arjun")   # Welcome to the game, Arjun!
greet_player("Priya")   # Welcome to the game, Priya!
greet_player("Rohan")   # Welcome to the game, Rohan!

# Function with MULTIPLE parameters
def introduce(name, age, hobby):
    print("Name: " + name)
    print("Age: " + str(age))
    print("Hobby: " + hobby)

introduce("Meera", 12, "painting")
introduce("Dev", 11, "gaming")`,
        tip: "Parameters are the variable names in the function definition. Arguments are the actual values you send when calling the function. Same idea, different moment!",
      },
      {
        title: "Return Values — Get Answers Back 📤",
        content: "Functions can CALCULATE something and SEND BACK the result using return. This is incredibly powerful!",
        code: `# A function that calculates and returns a value
def calculate_area(length, width):
    area = length * width
    return area   # Send the result back!

# The returned value can be stored or used
room_area = calculate_area(5, 4)
print("Room area: " + str(room_area) + " square metres")

# Use return values directly in expressions!
total_area = calculate_area(5, 4) + calculate_area(3, 3)
print("Total area: " + str(total_area))

# Another example
def is_adult(age):
    if age >= 18:
        return True
    else:
        return False

print(is_adult(20))  # True
print(is_adult(14))  # False`,
      },
      {
        title: "Putting It All Together — Real Functions 🛠️",
        content: "Now let's write functions that actually solve problems!",
        code: `# Calculate dog age
def dog_years(human_age):
    return human_age * 7

# Grade calculator
def get_grade(score):
    if score >= 90:
        return "A+"
    elif score >= 80:
        return "A"
    elif score >= 70:
        return "B"
    elif score >= 60:
        return "C"
    else:
        return "Try again!"

# Using our functions
my_age = 12
print("My dog age: " + str(dog_years(my_age)))

my_score = 87
print("My grade: " + get_grade(my_score))

# You can combine functions!
def student_report(name, score):
    grade = get_grade(score)   # Call another function!
    print(name + " scored " + str(score) + " → " + grade)

student_report("Aisha", 92)
student_report("Kabir", 75)`,
      },
      {
        title: "Default Parameters — Optional Extras 🎛️",
        content: "You can give parameters a default value. If the caller doesn't provide that argument, Python uses the default. This makes functions flexible!",
        code: `# Default parameters — used when no argument is given
def greet(name, time_of_day="morning", emoji="☀️"):
    print(f"Good {time_of_day}, {name}! {emoji}")

greet("Arjun")                    # Good morning, Arjun! ☀️
greet("Priya", "evening")         # Good evening, Priya! ☀️
greet("Rohan", "night", "🌙")    # Good night, Rohan! 🌙

# Another example — discount calculator with defaults
def calculate_price(price, discount=0, tax=18):
    discounted = price - (price * discount / 100)
    final = discounted + (discounted * tax / 100)
    return round(final, 2)

print(calculate_price(1000))           # No discount, 18% GST
print(calculate_price(1000, 10))       # 10% discount, 18% GST
print(calculate_price(1000, 20, 5))    # 20% off, 5% tax`,
        tip: "Default parameters must come AFTER non-default ones. def greet(name='Anon', age) would be an error! Always put defaults last.",
      },
      {
        title: "Default Parameters — Optional Extras 🎛️",
        content: "You can give parameters a default value. If the caller doesn't provide that argument, Python uses the default. This makes functions flexible!",
        code: `# Default parameters — used when no argument is given
def greet(name, time_of_day="morning", emoji="☀️"):
    print(f"Good {time_of_day}, {name}! {emoji}")

greet("Arjun")                    # Good morning, Arjun! ☀️
greet("Priya", "evening")         # Good evening, Priya! ☀️
greet("Rohan", "night", "🌙")    # Good night, Rohan! 🌙

# Another example — discount calculator with defaults
def calculate_price(price, discount=0, tax=18):
    discounted = price - (price * discount / 100)
    final = discounted + (discounted * tax / 100)
    return round(final, 2)

print(calculate_price(1000))           # No discount, 18% GST
print(calculate_price(1000, 10))       # 10% discount, 18% GST
print(calculate_price(1000, 20, 5))    # 20% off, 5% tax`,
        tip: "Default parameters must come AFTER non-default ones. def greet(name='Anon', age) would be an error! Always put defaults last.",
      },
      {
        title: "Functions Calling Functions 🔗",
        content: "The real power comes when functions work together — each doing one job, combining to do big things. This is how professional programs are built!",
        code: `# Calculate grade from marks
def get_grade(marks):
    if marks >= 90: return "A+"
    elif marks >= 75: return "A"
    elif marks >= 60: return "B"
    elif marks >= 50: return "C"
    else: return "F"

def get_remark(grade):
    remarks = {
        "A+": "Outstanding! 🌟",
        "A":  "Excellent! 🎉",
        "B":  "Good work! 👍",
        "C":  "Keep going! 💪",
        "F":  "Don't give up! ❤️"
    }
    return remarks[grade]

# This function uses BOTH functions above
def full_report(name, marks):
    grade  = get_grade(marks)      # Calls get_grade
    remark = get_remark(grade)     # Calls get_remark
    print(f"Student: {name}")
    print(f"Marks:   {marks}/100")
    print(f"Grade:   {grade}")
    print(f"Remark:  {remark}")
    print("―" * 30)

full_report("Priya", 92)
full_report("Arjun", 74)
full_report("Meera", 55)`,
      },
      {
        title: "Real-World Function Patterns 🏗️",
        content: "Professional Python code follows patterns that make it clean, readable, and easy to change. Here are the three patterns you'll see everywhere!",
        code: `# PATTERN 1: Validation — check before you act
def is_valid_age(age):
    return 8 <= age <= 15

# PATTERN 2: Formatting — display data nicely
def format_rupees(amount):
    return f"₹{amount:,}"

# PATTERN 3: Pure function — same input = same output, no side effects
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

# Using all three together
def enroll_student(name, age, fee):
    if not is_valid_age(age):
        print(f"Sorry, {name} — camp is for ages 8–15!")
        return
    print(f"✅ Enrolled: {name}, Age {age}")
    print(f"   Fee: {format_rupees(fee)}")
    print(f"   Welcome to CodersBee! 🐝")

enroll_student("Kabir", 11, 4000)
enroll_student("Grandpa", 65, 4000)  # Will be rejected!`,
        tip: "Each function should do ONE thing and do it well. If you're struggling to name a function, it probably does too many things — split it!",
      },
    ],
    challenge: {
      title: "Your Mission: Pizza Calculator 🍕",
      description: "Build a pizza ordering system using multiple functions — one to calculate price, one to print the order summary!",
      code: `# PIZZA CALCULATOR 🍕

def pizza_price(size, toppings):
    base_price = 0
    if size == "small":
        base_price = 150
    elif size == "medium":
        base_price = 250
    elif size == "large":
        base_price = 350
    topping_cost = toppings * 30
    total = base_price + topping_cost
    return total

def order_summary(name, size, toppings):
    price = pizza_price(size, toppings)
    print("=== ORDER SUMMARY ===")
    print("Customer: " + name)
    print("Size: " + size)
    print("Toppings: " + str(toppings))
    print("Total: ₹" + str(price))

order_summary("Riya", "large", 3)
order_summary("Arjun", "small", 1)`,
    },
    colabChallenge: {
      title: "Report Card Generator",
      emoji: "📋",
      description: "Build a full student report card generator in Google Colab or Replit. Use multiple functions — one to calculate average, one to get grade, one to print the full formatted report.",
      steps: [
        "Open Google Colab (colab.research.google.com) or Replit (replit.com) and create a new Python file",
        "Copy the starter code below into your notebook/editor",
        "Complete all the TODO sections — write the missing functions",
        "Test it with at least 2 different students",
        "Take a clear screenshot showing your code AND the output",
        "Send the screenshot to Manisha Mam on WhatsApp with the message below!",
      ],
      starterCode: `# 📋 REPORT CARD GENERATOR — Module 7 Project
# Complete all the TODO sections!

def calculate_average(marks_list):
    # TODO: Add up all marks and divide by number of subjects
    total = sum(marks_list)
    average = total / len(marks_list)
    return round(average, 1)

def get_grade(average):
    # TODO: Return grade based on average
    if average >= 90:
        return "A+ 🌟"
    elif average >= 75:
        return "A 🎉"
    elif average >= 60:
        return "B 👍"
    elif average >= 50:
        return "C 💪"
    else:
        return "F ❤️"

def print_report(name, class_name, subjects_dict):
    # TODO: Print a formatted report card
    print("=" * 35)
    print(f"   REPORT CARD — {name}")
    print(f"   Class: {class_name}")
    print("=" * 35)
    marks_list = []
    for subject, marks in subjects_dict.items():
        print(f"  {subject:<20} {marks}/100")
        marks_list.append(marks)
    print("-" * 35)
    avg = calculate_average(marks_list)
    grade = get_grade(avg)
    print(f"  Average: {avg}%")
    print(f"  Grade:   {grade}")
    print("=" * 35)

# Test with your own name and marks!
my_subjects = {
    "Maths":         85,
    "Science":       92,
    "English":       78,
    "Hindi":         88,
    "Social Studies": 74,
}

print_report("Your Name Here", "7-A", my_subjects)
print()
print_report("Priya Sharma", "8-B", {
    "Maths": 95, "Science": 90,
    "English": 88, "Hindi": 92, "Social Studies": 85
})`,
      expectedOutput: `===================================
   REPORT CARD — Your Name Here
   Class: 7-A
===================================
  Maths                85/100
  Science              92/100
  English              78/100
  Hindi                88/100
  Social Studies       74/100
-----------------------------------
  Average: 83.4%
  Grade:   A 🎉
===================================`,
      whatsappText: "Hi Manisha Mam! 📋 I completed Module 7 - Functions! I built a Report Card Generator using multiple functions. Here's my screenshot! 🐝",
    },
    quiz: [
      {
        question: "What keyword do you use to create a function in Python?",
        options: ["function", "create", "def", "make"],
        correct: 2,
        explanation: "def is short for 'define'. You write def, then the function name, then parentheses, then a colon. Like def my_function():",
      },
      {
        question: "What does the return statement do?",
        options: ["Prints a value on screen", "Sends a value back from the function", "Creates a new variable", "Loops back to the start"],
        correct: 1,
        explanation: "return sends a value BACK to wherever the function was called from. The caller can then store it in a variable or use it directly!",
      },
      {
        question: "Which of these correctly defines a function with a default parameter?",
        options: ["def greet(='hello', name):", "def greet(name, msg='hello'):", "def greet[name, msg='hello']:", "function greet(name, msg='hello'):"],
        correct: 1,
        explanation: "Default parameters go AFTER regular parameters. def greet(name, msg='hello') is correct — name is required, msg is optional with default 'hello'.",
      },
      {
        question: "How many times can you call the same function?",
        options: ["Once only", "Twice maximum", "As many times as you want", "Only 10 times"],
        correct: 2,
        explanation: "That's the whole point of functions! Write the code once, call it as many times as you need. This is called reusability!",
      },
      {
        question: "What happens when Python reaches a return statement?",
        options: ["It prints the value and continues", "It stops the function and sends the value back", "It repeats the function", "It creates a new variable"],
        correct: 1,
        explanation: "return immediately exits the function and sends the value back to whoever called it. Code after return in the same function never runs!",
      },
      {
        question: "Which of these is a valid function call for def add(a, b)?",
        options: ["add(5)", "add(5, 3)", "add(a=5, b=3, c=1)", "def add(5, 3)"],
        correct: 1,
        explanation: "add(5, 3) correctly passes two arguments matching the two parameters a and b. You can also use keyword arguments: add(a=5, b=3).",
      },
      {
        question: "What is the output of: def double(n): return n * 2 — then print(double(4) + 1)?",
        options: ["9", "8", "41", "Error"],
        correct: 0,
        explanation: "double(4) returns 8. Then 8 + 1 = 9. The return value is used directly in the expression — you don't need a variable to store it first!",
      },
    ],
    keyLearnings: [
      "def creates a function — write it once, call it as many times as you want",
      "Parameters are the variable names inside the brackets when defining a function",
      "Arguments are the actual values you send when calling a function",
      "return sends a value back from the function to wherever it was called",
      "Default parameters make arguments optional — specify a fallback value with =",
      "Functions can call other functions — this is how big programs are built from small pieces",
    ],
    funFact: "A professional Python program can have hundreds or even thousands of functions! Python itself has over 60 built-in functions ready for you to use — you've already been using print(), len(), and range()! 🔧",
    nextPreview: "Day 8: Dictionaries — the smartest way to organise data with labels instead of numbers!",
  },

  {
    id: 8,
    title: "Dictionaries",
    emoji: "📖",
    tagline: "The ultimate data organiser!",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    duration: "Day 8",
    topics: ["Key-value pairs", "Creating & accessing", "Updating dictionaries", "Looping through dicts", "Nested dictionaries", "Dict methods & when to use"],
    intro: "A list stores items by position (0, 1, 2...). But what if you want to look things up by NAME instead? Like a real dictionary — you look up 'python' and it tells you the definition! Python dictionaries store information as key-value pairs, making data super organised and fast to find. Every app you use — contacts, games, school records — uses dictionaries under the hood!",
    sections: [
      {
        title: "Key-Value Pairs — The Dictionary Idea 🗝️",
        content: "A dictionary maps a KEY (a label) to a VALUE (the information). Like a phone book: the NAME is the key, the PHONE NUMBER is the value!",
        code: `# Creating a dictionary with {}
student = {
    "name": "Priya",
    "age": 12,
    "grade": "7th",
    "favourite_subject": "Science"
}

# Access values using the KEY (not an index number)
print(student["name"])              # Priya
print(student["age"])               # 12
print(student["favourite_subject"]) # Science`,
        analogy: "Imagine a big book of lockers 🗃️. Each locker has a label (key) like 'Monday', 'Tuesday'. Inside is what you packed for that day (value). Instead of locker #3, you find things by their meaningful label!",
      },
      {
        title: "Updating and Adding to Dictionaries 🔧",
        content: "You can add new key-value pairs or update existing ones easily!",
        code: `student = {"name": "Priya", "age": 12}

# Add a new key-value pair
student["school"] = "Sunshine Academy"
print(student)  # {'name': 'Priya', 'age': 12, 'school': 'Sunshine Academy'}

# Update an existing value
student["age"] = 13     # Happy Birthday Priya! 🎂
print(student["age"])   # 13

# Remove a key-value pair
del student["school"]

# Check if a key exists
if "name" in student:
    print("Found the name:", student["name"])

# Get all keys and values
print(student.keys())    # dict_keys(['name', 'age'])
print(student.values())  # dict_values(['Priya', 13])`,
      },
      {
        title: "Looping Through Dictionaries 🔄",
        content: "Just like lists, you can loop through dictionaries to work with all the data!",
        code: `game_scores = {
    "Arjun": 9500,
    "Priya": 8200,
    "Rohan": 7800,
    "Meera": 9100
}

# Loop through keys
for player in game_scores:
    score = game_scores[player]
    print(player + ": " + str(score) + " points")

# Loop through key-value pairs together
for player, score in game_scores.items():
    if score > 9000:
        print("🏆 " + player + " is in the TOP TIER!")
    else:
        print("📊 " + player + ": " + str(score))`,
      },
      {
        title: "Real World: Student Report Card 📋",
        content: "Let's use dictionaries to build something real — a student report card!",
        code: `# A student report card using a dictionary
report_card = {
    "name": "Kabir",
    "class": "8-A",
    "subjects": {
        "Maths": 92,
        "Science": 88,
        "English": 76,
        "Hindi": 84,
        "Social Studies": 79
    }
}

# Print the report card
print("========= REPORT CARD =========")
print("Student: " + report_card["name"])
print("Class: " + report_card["class"])
print("-------------------------------")

total = 0
for subject, marks in report_card["subjects"].items():
    print(subject + ": " + str(marks) + "/100")
    total += marks

average = total / len(report_card["subjects"])
print("-------------------------------")
print("Average: " + str(round(average, 1)) + "%")`,
        analogy: "A nested dictionary is like a filing cabinet 🗄️. The cabinet is the outer dict, the drawers are the inner dicts, and the folders inside are the values. Very organised!",
      },
      {
        title: "Dictionary Methods — Your Toolkit 🛠️",
        content: "Python gives you powerful built-in methods to work with dictionaries without writing lots of code yourself!",
        code: `inventory = {
    "apples": 50,
    "bananas": 30,
    "mangoes": 0,
    "oranges": 15
}

# .get() — safe access (no error if key missing!)
stock = inventory.get("grapes", 0)   # Returns 0 if not found
print(f"Grapes in stock: {stock}")   # Grapes in stock: 0

# .keys(), .values(), .items()
print(list(inventory.keys()))        # All item names
print(list(inventory.values()))      # All quantities
for item, qty in inventory.items():
    status = "✅ In stock" if qty > 0 else "❌ Out of stock"
    print(f"{item:<10} — {status}")

# .update() — merge another dict in
new_stock = {"grapes": 25, "apples": 60}
inventory.update(new_stock)          # Adds grapes, updates apples
print(f"Apples now: {inventory['apples']}")  # 60

# .pop() — remove and return a value
removed = inventory.pop("bananas")
print(f"Removed bananas (had {removed})")`,
        tip: "Always use .get() when you're not 100% sure a key exists. inventory['grapes'] crashes if 'grapes' isn't there. inventory.get('grapes', 0) safely returns 0 instead!",
      },
      {
        title: "List vs Dictionary — When to Use Which? 🤔",
        content: "Lists and dictionaries are both essential. Knowing which to reach for is a key programmer skill!",
        code: `# USE A LIST when order matters or items are the same type:
shopping = ["milk", "eggs", "bread", "butter"]
scores   = [95, 87, 72, 91, 88]

# USE A DICTIONARY when you need labels for your data:
student = {
    "name": "Priya",
    "age": 12,
    "score": 95
}

# REAL EXAMPLE: storing multiple students
# Bad way — parallel lists (confusing, error-prone):
names  = ["Priya", "Arjun", "Meera"]
ages   = [12, 11, 13]
scores = [95, 87, 91]

# Good way — list of dictionaries:
students = [
    {"name": "Priya",  "age": 12, "score": 95},
    {"name": "Arjun",  "age": 11, "score": 87},
    {"name": "Meera",  "age": 13, "score": 91},
]

# Access is crystal clear:
for s in students:
    print(f"{s['name']} (age {s['age']}) — Score: {s['score']}")`,
      },
    ],
    challenge: {
      title: "Your Mission: The Contact Book",
      description: "Build a contact book that stores and displays friend information!",
      code: `# MY CONTACT BOOK 📱
contacts = {
    "Arjun": {"phone": "9876543210", "city": "Delhi"},
    "Priya": {"phone": "8765432109", "city": "Mumbai"},
}

# Add a new contact
contacts["___"] = {"phone": "___", "city": "___"}

# Display all contacts
print("=== MY CONTACT BOOK ===")
for name, info in contacts.items():
    print("👤 " + name)
    print("   📱 " + info["phone"])
    print("   📍 " + info["city"])
    print("")

# Search for a contact
search = "Priya"
if search in contacts:
    print("Found " + search + "!")
    print("Phone: " + contacts[search]["phone"])`,
    },
    colabChallenge: {
      title: "Digital Class Register",
      emoji: "📒",
      description: "Build a class register that stores student info in a dictionary of dictionaries. Add students, display the register, and find the class topper — all in Google Colab or Replit!",
      steps: [
        "Open Google Colab (colab.research.google.com) or Replit (replit.com) and create a new Python file",
        "Copy the starter code below and complete all TODO sections",
        "Add at least 4 students with their details and marks",
        "Make sure the 'find topper' section works correctly",
        "Take a clear screenshot showing your code AND the full output",
        "Send the screenshot to Manisha Mam on WhatsApp — it counts for your certificate! 🐝",
      ],
      starterCode: `# 📒 DIGITAL CLASS REGISTER — Module 8 Project

# The class register — dictionary of dictionaries
class_register = {
    "Priya Sharma": {
        "roll_no": 1,
        "age": 12,
        "marks": {"Maths": 92, "Science": 88, "English": 85},
        "hobby": "painting"
    },
    "Arjun Verma": {
        "roll_no": 2,
        "age": 11,
        "marks": {"Maths": 78, "Science": 94, "English": 70},
        "hobby": "cricket"
    },
    # TODO: Add 2 more students with your own names and marks!
}

def get_average(marks_dict):
    # TODO: Calculate and return the average of all marks
    return round(sum(marks_dict.values()) / len(marks_dict), 1)

def display_register(register):
    print("=" * 45)
    print("         CLASS REGISTER 📒")
    print("=" * 45)
    for name, info in register.items():
        avg = get_average(info["marks"])
        print(f"\\nRoll #{info['roll_no']:02d} — {name}")
        print(f"  Age: {info['age']}  |  Hobby: {info['hobby']}")
        print(f"  Marks: ", end="")
        for sub, marks in info["marks"].items():
            print(f"{sub}: {marks}", end="  ")
        print(f"\\n  Average: {avg}%")
    print("=" * 45)

def find_topper(register):
    # TODO: Find and return the student with highest average
    best_name = ""
    best_avg  = 0
    for name, info in register.items():
        avg = get_average(info["marks"])
        if avg > best_avg:
            best_avg  = avg
            best_name = name
    return best_name, best_avg

# Run it!
display_register(class_register)
topper, avg = find_topper(class_register)
print(f"\\n🏆 Class Topper: {topper} with {avg}% average!")`,
      expectedOutput: `=============================================
         CLASS REGISTER 📒
=============================================

Roll #01 — Priya Sharma
  Age: 12  |  Hobby: painting
  Marks: Maths: 92  Science: 88  English: 85
  Average: 88.3%

Roll #02 — Arjun Verma
  Age: 11  |  Hobby: cricket
  Marks: Maths: 78  Science: 94  English: 70
  Average: 80.7%
...
=============================================

🏆 Class Topper: Priya Sharma with 88.3% average!`,
      whatsappText: "Hi Manisha Mam! 📒 I completed Module 8 - Dictionaries! I built a Digital Class Register with nested dictionaries and found the class topper. Here's my screenshot! 🐝",
    },
    quiz: [
      {
        question: "How do you access a value in a dictionary?",
        options: ["dictionary[0]", "dictionary[\"key\"]", "dictionary.value", "get(dictionary)"],
        correct: 1,
        explanation: "You access dictionary values using the KEY in square brackets: my_dict[\"key\"]. Unlike lists, you use the meaningful label instead of a position number!",
      },
      {
        question: "What symbol separates keys from values in a dictionary?",
        options: ["=", "->", ":", ","],
        correct: 2,
        explanation: "Colon : separates keys from values! Like {\"name\": \"Priya\"}. The key is on the left of the colon, the value is on the right.",
      },
      {
        question: "What does dictionary.keys() return?",
        options: ["The first key only", "All the values", "All the keys", "The length of the dictionary"],
        correct: 2,
        explanation: "keys() returns all the key names in the dictionary. Similarly, values() gives all the values, and items() gives both keys AND values as pairs!",
      },
      {
        question: "What is a nested dictionary?",
        options: ["A dictionary inside a list", "A dictionary where values are also dictionaries", "A dictionary with only numbers", "Two dictionaries merged together"],
        correct: 1,
        explanation: "A nested dictionary has dictionaries as its values! Like student = {\"Priya\": {\"age\": 12, \"score\": 95}}. You access nested values with two keys: student[\"Priya\"][\"age\"].",
      },
      {
        question: "What does my_dict.get('key', 'default') do if 'key' doesn't exist?",
        options: ["Raises a KeyError", "Returns None", "Returns 'default'", "Creates the key with 'default' value"],
        correct: 2,
        explanation: ".get() is the safe way to access a dictionary! If the key doesn't exist, it returns the default value you specify instead of crashing with a KeyError.",
      },
      {
        question: "What's the best data structure to store a student's name, age, and score together?",
        options: ["A list [name, age, score]", "Three separate variables", "A dictionary {name: ..., age: ..., score: ...}", "A string"],
        correct: 2,
        explanation: "A dictionary is perfect here! Each piece of data gets a meaningful label (key). student['name'] is clearer than student[0], and you can add new fields any time.",
      },
      {
        question: "How do you loop through both keys AND values in a dictionary at once?",
        options: ["for key in my_dict:", "for key, value in my_dict.items():", "for key, value in my_dict:", "for item in my_dict.values():"],
        correct: 1,
        explanation: ".items() returns each key-value pair as a tuple. Use 'for key, value in my_dict.items()' to unpack both at once — this is the most common dictionary loop pattern!",
      },
    ],
    keyLearnings: [
      "Dictionaries store key-value pairs inside curly braces: {\"name\": \"Priya\"}",
      "Access a value using its key: my_dict[\"name\"] — not an index number",
      "Add or update: my_dict[\"new_key\"] = value — it's that simple",
      "Use .get(\"key\", default) for safe access — no crash if key is missing",
      "Loop through pairs with: for key, value in my_dict.items()",
      "Nested dicts (dict inside dict) are how real apps store structured data",
    ],
    funFact: "Python dictionaries are incredibly fast! Even if you have a million items, Python can find what you're looking for almost instantly. They use a technique called 'hashing' — like a superpower address book! 🔍",
    nextPreview: "Day 9: We put it all together with a real Python project — a Number Guessing Game!",
  },

  {
    id: 9,
    title: "Python Project Day!",
    emoji: "🏗️",
    tagline: "Build something real from scratch!",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    duration: "Day 9",
    topics: ["User input & random", "Building a full game", "Adding a score system", "Debugging like a pro", "Polishing your code", "Extending your project"],
    intro: "Today is PROJECT DAY — the first big milestone! We're going to use EVERYTHING we've learned — variables, if/else, loops, functions, and even dictionaries — and build a real, complete, playable game. By the end of today, you'll have something you can show your family and friends with pride. Today's project: a Number Guessing Game with hints, a score system, and a high-score board! 🎮",
    sections: [
      {
        title: "Getting Input from the User — input() 🎤",
        content: "Until now, all our data was hardcoded (written in the code). Real programs need to accept input from the user! The input() function pauses the program and waits for the user to type something.",
        code: `# input() always returns a STRING
name = input("What is your name? ")
print("Hello, " + name + "!")

# For numbers, convert with int() or float()
age = int(input("How old are you? "))
print("In 10 years, you'll be " + str(age + 10))

favourite_number = int(input("Pick a number 1-10: "))
if favourite_number == 7:
    print("That's my favourite too! 🎉")
else:
    print("Interesting choice!")`,
        tip: "input() always gives you a STRING, even if the user types a number. Always use int() or float() to convert if you want to do math with it!",
      },
      {
        title: "The Random Library — Making Surprises! 🎲",
        content: "Python has a special library called 'random' that generates random numbers. Perfect for games!",
        code: `import random  # Import the random library

# Pick a random number between 1 and 100
secret = random.randint(1, 100)
print("I picked a number between 1 and 100!")

# Other useful random tools
print(random.randint(1, 6))    # Simulate a dice roll 🎲
print(random.choice(["rock", "paper", "scissors"]))  # Random choice

# Random is used in EVERYTHING:
# - Shuffling cards in card games 🃏
# - Spawning enemies in video games 👾
# - Picking random questions in quizzes 📝`,
      },
      {
        title: "Build the Number Guessing Game 🎮",
        content: "Now let's build the complete game, step by step!",
        code: `import random

def play_guessing_game():
    # Setup
    secret_number = random.randint(1, 100)
    max_guesses = 7
    guesses_used = 0

    print("=== NUMBER GUESSING GAME ===")
    print("I'm thinking of a number between 1 and 100!")
    print("You have " + str(max_guesses) + " guesses. Good luck! 🍀")
    print("")

    # Game loop
    while guesses_used < max_guesses:
        guess = int(input("Your guess: "))
        guesses_used += 1
        guesses_left = max_guesses - guesses_used

        if guess == secret_number:
            print("🎉 CORRECT! You got it!")
            print("You used " + str(guesses_used) + " guesses!")
            if guesses_used <= 3:
                print("⭐ Amazing! You're psychic!")
            return
        elif guess < secret_number:
            print("📈 Too low! Try higher. (" + str(guesses_left) + " left)")
        else:
            print("📉 Too high! Try lower. (" + str(guesses_left) + " left)")

    print("😢 Game over! The number was " + str(secret_number))

# Start the game!
play_guessing_game()

# Ask to play again
again = input("Play again? (yes/no): ")
if again == "yes":
    play_guessing_game()`,
      },
      {
        title: "Debugging — Fixing Your Code 🔍",
        content: "When something goes wrong, don't panic! Every programmer debugs code. Here are the most common errors and how to fix them:",
        code: `# ERROR TYPE 1: NameError — Variable doesn't exist
# score = scroe + 10  ← Typo! 'scroe' should be 'score'

# ERROR TYPE 2: TypeError — Wrong type
# age = "12"
# print(age + 1)  ← Can't add string + number!
# Fix: age = int("12") or print(str(age) + " years")

# ERROR TYPE 3: IndentationError — Wrong spacing
# def greet():
# print("Hello")  ← Should be indented 4 spaces!
# Fix:
# def greet():
#     print("Hello")  ← Now it's inside the function

# DEBUGGING TIPS:
# 1. Read the error message — it tells you the LINE!
# 2. Print variables to check their values
# 3. Comment out code to find the broken part
# 4. Take a break and come back with fresh eyes 👀`,
      },
      {
        title: "Adding a Score System 🏆",
        content: "Turn a one-off game into a proper scored experience! Track scores, rate performance, and challenge players to beat their best.",
        code: `import random

def rate_performance(guesses_used, max_guesses):
    ratio = guesses_used / max_guesses
    if ratio <= 0.3:   return "🌟 PSYCHIC! Incredible!"
    elif ratio <= 0.5: return "🔥 Sharp shooter!"
    elif ratio <= 0.7: return "👍 Good job!"
    else:              return "💪 Keep practising!"

def calculate_score(guesses_used, max_guesses):
    # Fewer guesses = higher score
    return max(0, (max_guesses - guesses_used + 1) * 100)

# Score tracker using a DICTIONARY (we just learned those!)
scoreboard = {}

def add_to_scoreboard(player, score):
    if player not in scoreboard:
        scoreboard[player] = score
    else:
        # Only update if it's a new best
        if score > scoreboard[player]:
            scoreboard[player] = score
            print(f"🎉 New personal best for {player}!")

def show_scoreboard():
    if not scoreboard:
        print("No scores yet!")
        return
    print("\\n=== 🏆 SCOREBOARD ===")
    # Sort by score, highest first
    sorted_scores = sorted(scoreboard.items(), key=lambda x: x[1], reverse=True)
    for i, (name, score) in enumerate(sorted_scores, 1):
        medal = ["🥇", "🥈", "🥉"][i-1] if i <= 3 else f"#{i}"
        print(f"{medal} {name:<15} {score} pts")`,
        tip: "lambda x: x[1] is a mini one-line function! sorted() uses it to know which part of each (name, score) pair to sort by — we want x[1], which is the score.",
      },
      {
        title: "Polishing Your Code ✨",
        content: "Good code works. Great code is also readable, friendly, and handles mistakes gracefully. Let's make your game production-quality!",
        code: `# POLISH 1: Handle bad input gracefully
def safe_int_input(prompt, min_val=None, max_val=None):
    while True:
        try:
            value = int(input(prompt))
            if min_val is not None and value < min_val:
                print(f"Please enter {min_val} or higher!")
                continue
            if max_val is not None and value > max_val:
                print(f"Please enter {max_val} or lower!")
                continue
            return value
        except ValueError:
            print("That's not a number! Try again.")

# POLISH 2: Clear welcome screen
def show_welcome():
    print("╔══════════════════════════════╗")
    print("║   🎮 NUMBER GUESSING GAME    ║")
    print("║   Powered by Python 🐍       ║")
    print("╚══════════════════════════════╝")
    print()

# POLISH 3: Play-again loop
def main():
    show_welcome()
    player = input("Enter your name: ")
    while True:
        # ... game code ...
        again = input("\\nPlay again? (yes/no): ").lower()
        if again != "yes":
            show_scoreboard()
            print(f"\\nThanks for playing, {player}! 👋")
            break`,
      },
    ],
    challenge: {
      title: "Your Mission: Upgrade the Game!",
      description: "Add these features to the Number Guessing Game to make it even better!",
      code: `# UPGRADED GUESSING GAME — ADD THESE FEATURES:

# FEATURE 1: Track the player's best score
best_score = 999  # Start high, lower is better

# FEATURE 2: Give temperature hints
# "Red hot!" when within 5, "Warm!" within 15
# "Cold!" when more than 15 away

def temperature_hint(guess, secret):
    difference = abs(guess - secret)  # abs() = always positive
    if difference == 0:
        return "🎯 BULLSEYE!"
    elif difference <= 5:
        return "🔥 RED HOT!"
    elif difference <= 15:
        return "☀️ Warm!"
    else:
        return "🧊 Cold..."

# FEATURE 3: Keep a list of all your guesses
all_guesses = []
# all_guesses.append(guess) inside the loop

# Try to add all 3 features to the game!`,
    },
    colabChallenge: {
      title: "Full Number Guessing Game with Scoreboard",
      emoji: "🎮",
      description: "Build the complete, polished Number Guessing Game with temperature hints, a scoring system, and a multi-player scoreboard stored in a dictionary. This is your first real, complete Python project!",
      steps: [
        "Open Google Colab (colab.research.google.com) or Replit (replit.com) and start a new Python file",
        "Copy the starter code and complete all the TODO sections",
        "Run the game and play at least 2 full rounds with different player names",
        "Make sure the scoreboard shows after playing (with rankings!)",
        "Take a screenshot showing the scoreboard with at least 2 players' scores",
        "Send it to Manisha Mam on WhatsApp — this unlocks your Module 9 certificate badge! 🏆",
      ],
      starterCode: `import random

# 🏆 Scoreboard — stored in a dictionary!
scoreboard = {}

def get_grade(guesses_used, max_guesses):
    ratio = guesses_used / max_guesses
    if ratio <= 0.3:   return "🌟 PSYCHIC!"
    elif ratio <= 0.5: return "🔥 Sharp!"
    elif ratio <= 0.7: return "👍 Good!"
    else:              return "💪 Keep going!"

def calculate_score(guesses_used, max_guesses):
    return max(0, (max_guesses - guesses_used + 1) * 100)

def temperature_hint(guess, secret):
    diff = abs(guess - secret)
    if diff == 0:       return "🎯 BULLSEYE!"
    elif diff <= 5:     return "🔥 RED HOT! Very close!"
    elif diff <= 15:    return "☀️ Warm! Getting closer."
    elif diff <= 30:    return "❄️ Cold..."
    else:               return "🧊 FREEZING! Way off!"

def play_round(player_name):
    secret = random.randint(1, 100)
    max_guesses = 7
    guesses_used = 0

    print(f"\\n🎮 {player_name}'s turn! Guess my number (1-100)")
    print(f"You have {max_guesses} guesses. Go!\\n")

    while guesses_used < max_guesses:
        try:
            guess = int(input(f"Guess #{guesses_used + 1}: "))
        except ValueError:
            print("Numbers only please!")
            continue

        guesses_used += 1
        hint = temperature_hint(guess, secret)
        print(f"  {hint}  ({max_guesses - guesses_used} guesses left)")

        if guess == secret:
            score = calculate_score(guesses_used, max_guesses)
            grade = get_grade(guesses_used, max_guesses)
            print(f"\\n✅ CORRECT in {guesses_used} guess(es)! {grade}")
            print(f"   Score: {score} points")
            # TODO: Update scoreboard — only keep best score per player
            if player_name not in scoreboard or score > scoreboard[player_name]:
                scoreboard[player_name] = score
                print("   📈 Personal best!")
            return

    print(f"\\n😢 Out of guesses! The number was {secret}.")

def show_scoreboard():
    print("\\n╔════════════════════════════╗")
    print("║     🏆 SCOREBOARD          ║")
    print("╠════════════════════════════╣")
    if not scoreboard:
        print("║  No scores yet!            ║")
    else:
        sorted_scores = sorted(scoreboard.items(), key=lambda x: x[1], reverse=True)
        for i, (name, score) in enumerate(sorted_scores, 1):
            medal = ["🥇","🥈","🥉"][i-1] if i <= 3 else f"#{i} "
            print(f"║  {medal} {name:<12} {score:>5} pts  ║")
    print("╚════════════════════════════╝")

# MAIN GAME LOOP
print("╔══════════════════════════════╗")
print("║  🎮 NUMBER GUESSING GAME 🎮  ║")
print("╚══════════════════════════════╝")

while True:
    player = input("\\nEnter your name (or 'quit'): ")
    if player.lower() == "quit":
        break
    play_round(player)
    show_scoreboard()
    again = input("\\nAnother round? (yes/no): ").lower()
    if again != "yes":
        break

print("\\nThanks for playing! 👋🐝")`,
      expectedOutput: `╔══════════════════════════════╗
║  🎮 NUMBER GUESSING GAME 🎮  ║
╚══════════════════════════════╝

Enter your name: Priya
🎮 Priya's turn! Guess my number (1-100)
...
✅ CORRECT in 4 guess(es)! 👍 Good!
   Score: 400 points

╔════════════════════════════╗
║     🏆 SCOREBOARD          ║
╠════════════════════════════╣
║  🥇 Priya        400 pts  ║
╚════════════════════════════╝`,
      whatsappText: "Hi Manisha Mam! 🎮 I completed Module 9 - Project Day! I built a full Number Guessing Game with temperature hints and a scoreboard. Here's my screenshot! 🏆🐝",
    },
    quiz: [
      {
        question: "What does input() always return?",
        options: ["An integer", "A float", "A string", "A list"],
        correct: 2,
        explanation: "input() ALWAYS returns a string, even if the user types a number! If you need a number, wrap it: int(input(\"Enter number: \"))",
      },
      {
        question: "What library do you need for random numbers?",
        options: ["numbers", "random", "math", "choice"],
        correct: 1,
        explanation: "You need 'import random' at the top of your program. Then use random.randint(min, max) to get a random whole number!",
      },
      {
        question: "What's the best first thing to do when your code has an error?",
        options: ["Start over from scratch", "Delete everything and try again", "Read the error message carefully", "Ask someone else to fix it"],
        correct: 2,
        explanation: "Error messages are your FRIENDS! They tell you exactly which line has the problem and what went wrong. Read them carefully — they usually give you a big clue!",
      },
      {
        question: "Why do we write int(input(...)) instead of just input(...)?",
        options: ["To make it faster", "Because input() returns a string and we need a number for math", "To avoid bugs in the terminal", "int() is required before all inputs"],
        correct: 1,
        explanation: "input() always gives a string. '5' + 1 would crash! int() converts '5' to the number 5 so you can do arithmetic. Always convert when expecting a number!",
      },
      {
        question: "What does random.randint(1, 10) return?",
        options: ["Always 5 (the middle)", "A random decimal between 1 and 10", "A random whole number from 1 to 10 inclusive", "A random number from 0 to 9"],
        correct: 2,
        explanation: "randint(1, 10) returns a random integer between 1 and 10, including both 1 and 10 themselves. This is different from range(1, 10) which excludes 10!",
      },
      {
        question: "Which concept from the game uses a dictionary?",
        options: ["Picking the secret number", "Getting user input", "Storing the scoreboard", "Checking if a guess is correct"],
        correct: 2,
        explanation: "The scoreboard is a perfect dictionary use case! Keys are player names, values are their best scores. scoreboard['Priya'] = 400 — meaningful labels, not index numbers.",
      },
      {
        question: "What does abs(guess - secret) calculate?",
        options: ["The sum of guess and secret", "How many guesses are left", "The absolute (positive) distance between the guess and the secret", "Whether the guess is correct"],
        correct: 2,
        explanation: "abs() gives the absolute value — always positive. abs(30 - 80) = 50, abs(80 - 30) = 50. We use it for the temperature hint so it doesn't matter if the guess is too high or too low!",
      },
    ],
    keyLearnings: [
      "input() lets users type something — it always returns a string",
      "Wrap input with int() to get a number: int(input(\"Enter age: \"))",
      "import random then random.randint(1, 100) gives a random whole number",
      "Read error messages carefully — they name the line and the type of problem",
      "Use a dictionary to store a scoreboard: {player_name: best_score}",
      "A working simple program beats a broken complex one every time",
    ],
    funFact: "The first computer bug was an actual BUG! In 1947, Grace Hopper found a real moth stuck in a computer relay causing errors. She taped it into her log book and wrote 'First actual case of bug being found'. That's where 'debugging' comes from! 🦗",
    nextPreview: "Day 10: We enter the world of Artificial Intelligence! What is AI and how does it really work?",
  },

  {
    id: 10,
    title: "What is AI?",
    emoji: "🤖",
    tagline: "The brain behind the magic!",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    duration: "Day 10",
    topics: ["What is Artificial Intelligence?", "How AI learns", "AI in everyday life", "Types of AI"],
    intro: "You've been building Python skills for 9 days. Now we unlock the most exciting part: Artificial Intelligence! AI isn't magic (though it feels like it) — it's patterns, data, and really clever maths. By the end of today, you'll understand how Siri knows what you said, how Netflix knows what you'll watch next, and how AI can create art! 🎨",
    sections: [
      {
        title: "What is Artificial Intelligence? 🧠",
        content: "Artificial Intelligence means making computers smart enough to do things that normally need human intelligence — like understanding speech, recognising faces, making decisions, or creating art. AI doesn't 'know' things like a human. Instead, it finds PATTERNS in huge amounts of data.",
        analogy: "Imagine you've seen 10,000 photos of cats 🐱 and 10,000 of dogs 🐶. You'd get very good at telling them apart, right? That's exactly how AI learns — it looks at thousands (or millions!) of examples until it can recognise patterns on its own!",
        tip: "AI is not magic — it's maths + data + patterns. The more examples it sees, the smarter it gets!",
      },
      {
        title: "AI in Your Everyday Life 📱",
        content: "You already interact with AI many times every day — you just might not have realised it!",
        code: `# AI SPOTTING GAME 🔍
# Can you identify the AI in each scenario?

# 📱 When you unlock your phone with your face
#    → Computer Vision AI recognises your face

# 🎵 When Spotify suggests a song you love
#    → Recommendation AI studied your listening habits

# 💬 When you type and your phone suggests the next word
#    → Language AI predicts what you'll type next

# 🚗 When Google Maps warns of traffic ahead
#    → Prediction AI analysed thousands of trips

# 🎮 When game enemies react smartly to your moves
#    → Game AI learns your playing style

# 📸 When your camera automatically focuses on your face
#    → Object Detection AI finds faces in images`,
      },
      {
        title: "How Does AI Actually Learn? 📚",
        content: "AI learns through a process called Machine Learning — you feed it examples, it finds patterns, and it gets better over time. Think of it like training a puppy! 🐕",
        code: `# SIMPLIFIED: How AI learns to spot spam emails

# Step 1: Show AI thousands of SPAM emails
spam_examples = [
    "WIN FREE iPHONE CLICK NOW!!!",
    "You've WON $1,000,000 claim prize",
    "URGENT: Your account will be DELETED",
]

# Step 2: Show AI thousands of REAL emails
real_examples = [
    "Hi Priya, are you coming to the party?",
    "Your order has shipped! Track here:",
    "Meeting at 3pm tomorrow - see you then",
]

# Step 3: AI finds patterns!
# SPAM tends to: ALL CAPS, lots of !!! many zeros
# REAL tends to: Normal case, personal, specific

# Step 4: Now it can guess if NEW emails are spam!
new_email = "CONGRATULATIONS!!! CLAIM $5000 NOW!!!"
# AI sees: ALL CAPS + !!! + money + "CLAIM" = probably SPAM 🚫`,
      },
      {
        title: "Types of AI 🌈",
        content: "AI comes in many flavours, each specialised for different tasks!",
        code: `# THE DIFFERENT TYPES OF AI:

# 1. 🖼️ COMPUTER VISION
#    Sees and understands images & video
#    Used in: Face unlock, medical scans, self-driving cars

# 2. 💬 NATURAL LANGUAGE PROCESSING (NLP)
#    Understands and generates human language
#    Used in: ChatGPT, Google Translate, Siri, Alexa

# 3. 🎵 AUDIO AI
#    Recognises and generates sound
#    Used in: Spotify, voice assistants, music generation

# 4. 🎮 REINFORCEMENT LEARNING
#    Learns by trial and error (like a game player!)
#    Used in: AlphaGo (beat world chess champion!),
#             game AI, robot movement

# 5. 🎨 GENERATIVE AI
#    Creates NEW content (images, text, music, video)
#    Used in: ChatGPT, DALL-E, Midjourney, Sora

# Fun fact: ChatGPT was trained on so much text
# that if you printed it out, the stack of papers
# would be taller than Mount Everest! 🏔️`,
      },
    ],
    challenge: {
      title: "Your Mission: AI Spotter Journal",
      description: "For one day, write down every AI you interact with! Here's a starter template:",
      code: `# MY AI SPOTTER JOURNAL 📓
# (Write this in your notebook, not Python!)

ai_sightings = {
    "morning": [
        "Phone face unlock → Computer Vision AI",
        "YouTube suggested video → Recommendation AI",
        # What else did you notice?
    ],
    "afternoon": [
        # Add your observations here!
    ],
    "evening": [
        # What AI did you spot?
    ]
}

# Questions to think about:
# 1. Which AI interaction surprised you most?
# 2. Which AI would you miss most if it disappeared?
# 3. Can you think of an AI that doesn't exist yet
#    but would make your life better?`,
    },
    quiz: [
      {
        question: "How does AI learn to recognise cat photos?",
        options: ["A programmer describes what cats look like", "It looks up cats in a dictionary", "It finds patterns from thousands of cat examples", "It copies how human eyes work"],
        correct: 2,
        explanation: "AI learns from EXAMPLES! Show it thousands of photos labelled 'cat' and 'not cat', and it finds the patterns that make cats look like cats. This is called Machine Learning!",
      },
      {
        question: "What type of AI does ChatGPT use?",
        options: ["Computer Vision", "Natural Language Processing", "Reinforcement Learning", "Audio AI"],
        correct: 1,
        explanation: "ChatGPT uses Natural Language Processing (NLP) — AI that understands and generates human language. It was trained on an enormous amount of text from books and the internet!",
      },
      {
        question: "When Netflix suggests a show you'll love, what kind of AI is that?",
        options: ["Generative AI", "Computer Vision", "Recommendation AI", "Audio AI"],
        correct: 2,
        explanation: "Recommendation AI! It studies what you've watched, what similar users enjoyed, and finds patterns to predict what YOU will like. It gets smarter the more you use it!",
      },
    ],
    keyLearnings: [
      "AI finds patterns in huge amounts of data — it doesn't 'know' things like humans",
      "Machine Learning = showing AI thousands of examples until it spots the pattern",
      "Computer Vision AI understands images; NLP AI understands language",
      "Recommendation AI studies your habits to predict what you'll like next",
      "Generative AI creates new content — text, images, music — from prompts",
      "AI is maths + data + patterns. The more examples it sees, the smarter it gets",
    ],
    funFact: "GPT-4, the AI behind ChatGPT, was trained on approximately 1 trillion words of text — that's like reading every book ever written multiple times! 📚",
    nextPreview: "Day 11: Connect Python to real AI — we'll use APIs to add AI superpowers to our programs!",
  },

  {
    id: 11,
    title: "AI with Python — APIs",
    emoji: "🔌",
    tagline: "Connect Python to the AI world!",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    duration: "Day 11",
    topics: ["What is an API?", "How APIs work", "Using Python to call APIs", "Getting real AI responses"],
    intro: "You've built Python programs that run on your computer. Now we're going to connect to the INTERNET and use real AI! An API is like a doorbell for a service — you ring it (send a request), and the service answers back (sends a response). Today we'll ring the doorbell of AI services and make them do amazing things! 🚀",
    sections: [
      {
        title: "What is an API? 🍕",
        content: "API stands for Application Programming Interface. It's a way for different programs to talk to each other. Think of it as a waiter at a restaurant!",
        analogy: "You (your program) sit at a table (your computer). You don't go into the kitchen yourself. Instead, you tell the waiter (API) what you want. The waiter goes to the kitchen (the AI service), gets what you asked for, and brings it back to you! 🍕 The kitchen's secret recipes stay secret — you just get the food!",
        code: `# How an API works (simplified):

# 1. Your program sends a REQUEST
request = {
    "to": "weather_service",
    "asking_for": "weather in Delhi",
    "format": "JSON"
}

# 2. The service processes it and sends a RESPONSE
response = {
    "city": "Delhi",
    "temperature": 35,
    "condition": "Sunny",
    "humidity": "45%"
}

# 3. Your program uses the response!
print("It is " + str(response["temperature"]) + "°C in Delhi")`,
      },
      {
        title: "Installing Libraries — pip 📦",
        content: "To call APIs in Python, we use a library called 'requests'. Install it once, use it forever!",
        code: `# In your terminal/command prompt, type:
# pip install requests

# Then in your Python file:
import requests

# Let's call a FREE public API — no sign-up needed!
# This API tells you a random joke!

response = requests.get("https://official-joke-api.appspot.com/random_joke")
joke_data = response.json()  # Convert the response to a dictionary

print("Setup: " + joke_data["setup"])
print("Punchline: " + joke_data["punchline"])`,
        tip: "response.json() converts the API's response into a Python dictionary — which you already know how to use! Every API response is basically a dictionary.",
      },
      {
        title: "Using the OpenAI API — Real AI! 🤖",
        content: "The OpenAI API lets you send messages to ChatGPT from your Python code! This is how real AI apps are built.",
        code: `# First: pip install openai
# You need an API key from platform.openai.com

from openai import OpenAI

# Create a client (like hiring a messenger)
client = OpenAI(api_key="YOUR_API_KEY_HERE")

def ask_ai(question):
    response = client.chat.completions.create(
        model="gpt-4o-mini",  # Fast and affordable model
        messages=[
            {
                "role": "system",
                "content": "You are a helpful tutor for kids aged 10-14."
            },
            {
                "role": "user",
                "content": question
            }
        ]
    )
    return response.choices[0].message.content

# Ask the AI!
answer = ask_ai("Explain photosynthesis like I'm 10 years old")
print(answer)

# Ask another question!
answer2 = ask_ai("Tell me a fun fact about space")
print(answer2)`,
      },
      {
        title: "Free APIs to Practice With 🆓",
        content: "You don't always need a paid API! There are many free ones to experiment with:",
        code: `import requests

# 1. RANDOM ACTIVITY SUGGESTION
response = requests.get("https://www.boredapi.com/api/activity")
activity = response.json()
print("Try this: " + activity["activity"])
print("Type: " + activity["type"])

# 2. RANDOM DOG PHOTO 🐕
response = requests.get("https://dog.ceo/api/breeds/image/random")
dog_data = response.json()
print("Dog photo URL: " + dog_data["message"])

# 3. TRIVIA QUESTION 🧠
response = requests.get(
    "https://opentdb.com/api.php?amount=1&difficulty=easy"
)
trivia = response.json()
question = trivia["results"][0]
print("Question: " + question["question"])
print("Answer: " + question["correct_answer"])`,
      },
    ],
    challenge: {
      title: "Your Mission: The Trivia Quiz Bot",
      description: "Build a quiz game that gets questions from the internet!",
      code: `import requests

def get_question():
    response = requests.get(
        "https://opentdb.com/api.php?amount=1&type=multiple"
    )
    data = response.json()
    return data["results"][0]

def play_quiz():
    score = 0
    rounds = 3

    print("=== INTERNET TRIVIA QUIZ ===")

    for round_num in range(1, rounds + 1):
        print(f"\\nRound {round_num}:")
        q = get_question()

        print("Q: " + q["question"])
        print("A) " + q["correct_answer"])
        # Add the wrong answers too and shuffle them!

        answer = input("Your answer: ")
        if answer == q["correct_answer"]:
            print("✅ Correct!")
            score += 1
        else:
            print("❌ Wrong! Answer was: " + q["correct_answer"])

    print("\\nFinal score: " + str(score) + "/" + str(rounds))

play_quiz()`,
    },
    quiz: [
      {
        question: "What does API stand for?",
        options: ["Automated Python Interface", "Application Programming Interface", "Artificial Python Integration", "Advanced Program Installer"],
        correct: 1,
        explanation: "API = Application Programming Interface. It's a set of rules that lets different programs communicate with each other — like a common language for software!",
      },
      {
        question: "What does response.json() do?",
        options: ["Saves the response to a file", "Converts the API response into a Python dictionary", "Sends data to the API", "Checks if the API is working"],
        correct: 1,
        explanation: "json() converts the API's response (which comes as text) into a Python dictionary that you can work with normally. API responses are usually in JSON format!",
      },
      {
        question: "What is an API key?",
        options: ["A physical USB key to unlock the API", "A secret password that identifies your program to the service", "A type of keyboard shortcut", "The main function in an API"],
        correct: 1,
        explanation: "An API key is like a secret password or ID card for your program. It tells the service 'this request is coming from MY program', and helps the service track usage and prevent misuse.",
      },
    ],
    keyLearnings: [
      "API = Application Programming Interface — a doorbell for online services",
      "Your program sends a request; the service sends back a response",
      "response.json() converts the API's reply into a Python dictionary",
      "An API key is your program's ID card — keep it secret, never share it",
      "import requests is all you need to start calling APIs in Python",
      "APIs power almost every app you use — weather, maps, music, payments",
    ],
    funFact: "Every time you use Google Maps, your phone makes around 100 API calls per trip! Every turn, traffic update, and reroute is a separate request to Google's servers. 🗺️",
    nextPreview: "Day 12: Build a complete AI Chatbot — your own mini ChatGPT!",
  },

  {
    id: 12,
    title: "Build a Chatbot!",
    emoji: "💬",
    tagline: "Create your own mini ChatGPT!",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    duration: "Day 12",
    topics: ["Rule-based chatbots", "Pattern matching", "AI-powered chatbots", "Giving your bot a personality"],
    intro: "Today you become a chatbot creator! We'll start simple — a bot that uses if/else rules — then level up to a bot powered by real AI. By the end of the day, you'll have your very own named chatbot with a personality. Ready? Let's code! 💬",
    sections: [
      {
        title: "Level 1: Rule-Based Chatbot 🔀",
        content: "The simplest chatbot uses if/else to match keywords and reply. It's not smart, but it works for simple things!",
        code: `def simple_chatbot(message):
    message = message.lower()  # Convert to lowercase

    if "hello" in message or "hi" in message:
        return "Hey there! 👋 I'm BuzzyBot!"
    elif "how are you" in message:
        return "I'm doing great, thanks for asking! 😊"
    elif "name" in message:
        return "My name is BuzzyBot! Nice to meet you!"
    elif "bye" in message or "goodbye" in message:
        return "Goodbye! Come chat again soon! 👋"
    elif "help" in message:
        return "I can answer simple questions! Try asking: hello, how are you, or bye"
    else:
        return "Hmm, I'm not sure about that. Try asking something else!"

# Chat loop
print("BuzzyBot is ready! Type 'bye' to exit.")
while True:
    user_input = input("You: ")
    if "bye" in user_input.lower():
        print("BuzzyBot: See you later! 👋")
        break
    response = simple_chatbot(user_input)
    print("BuzzyBot: " + response)`,
      },
      {
        title: "Level 2: Smarter Matching 🧩",
        content: "Let's add a knowledge base — a dictionary of topics and answers — to make the bot know more!",
        code: `# Knowledge base: dictionary of topics → responses
knowledge_base = {
    "python": "Python is a programming language created in 1991! It's great for AI, web dev, and science.",
    "ai": "AI stands for Artificial Intelligence! It's about making computers smart enough to learn from examples.",
    "space": "Space is HUGE! The Milky Way alone has 100-400 billion stars. We've only landed on the Moon so far!",
    "coding": "Coding is like giving instructions to a robot. Python, JavaScript, and Scratch are great languages to start!",
    "minecraft": "Minecraft sold over 238 million copies! You can even code your own mods using Python.",
}

def smart_chatbot(message):
    message = message.lower()

    # Check knowledge base
    for topic, answer in knowledge_base.items():
        if topic in message:
            return answer

    # Personality responses
    if any(word in message for word in ["hello", "hi", "hey"]):
        return "Hi! I'm Buzzy! Ask me about Python, AI, or space! 🚀"

    return "Interesting question! I'm still learning. Ask me about Python, AI, or space!"

# Test it!
print(smart_chatbot("Tell me about AI"))
print(smart_chatbot("I love coding!"))`,
      },
      {
        title: "Level 3: AI-Powered Chatbot 🤖",
        content: "Now let's give your chatbot a real brain using the OpenAI API! You can give it any personality you want!",
        code: `from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")

# The conversation history (AI remembers context!)
conversation_history = []

# Give your bot a PERSONALITY!
bot_personality = """
You are Buzzy, a friendly AI tutor for kids aged 10-14.
Your personality:
- Always enthusiastic and encouraging 🌟
- Use emojis to make things fun
- Explain things simply, like talking to a friend
- Give examples kids can relate to (games, school, food)
- Never say anything scary or sad
- If you don't know something, say "Great question! 🤔"
"""

def chat_with_buzzy(user_message):
    conversation_history.append({
        "role": "user",
        "content": user_message
    })

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": bot_personality}
        ] + conversation_history
    )

    bot_reply = response.choices[0].message.content
    conversation_history.append({
        "role": "assistant",
        "content": bot_reply
    })
    return bot_reply

# Chat!
print("🐝 BUZZY: Hi! I'm Buzzy, your AI tutor! What shall we learn today?")
while True:
    user_input = input("You: ")
    if user_input.lower() == "quit":
        print("🐝 BUZZY: Bye! Keep learning! 🌟")
        break
    reply = chat_with_buzzy(user_input)
    print("🐝 BUZZY: " + reply)`,
      },
    ],
    challenge: {
      title: "Your Mission: Name and Theme Your Chatbot",
      description: "Create your own chatbot with a unique name and personality!",
      code: `# DESIGN YOUR CHATBOT!

# Step 1: Give it a name and theme
# Ideas: TechBot, ChefBot, SpaceBot, SportsBot, MusicBot

bot_name = "___"
bot_theme = "___"  # What topic does it specialise in?

# Step 2: Write its personality (for the AI version)
bot_personality = f"""
You are {bot_name}, a chatbot that specialises in {bot_theme}.
You talk to kids aged 10-14.
Always be:
- [ADD YOUR BOT'S TRAITS HERE]
- [ADD MORE TRAITS]
- [ONE MORE!]
"""

# Step 3: Build the rule-based version first
def your_chatbot(message):
    message = message.lower()

    # Add at least 5 responses!
    if "hello" in message:
        return f"Hey! I'm {bot_name}! Ask me about {bot_theme}!"
    # ADD MORE RULES HERE...
    else:
        return "Tell me more!"

# Test your chatbot!
print(your_chatbot("hello"))
print(your_chatbot("___"))  # Test with something from your theme!`,
    },
    quiz: [
      {
        question: "What is a 'rule-based' chatbot?",
        options: ["A chatbot that makes up its own rules", "A chatbot that uses if/else to match keywords and reply", "A chatbot connected to the internet", "A chatbot that only speaks one language"],
        correct: 1,
        explanation: "A rule-based chatbot uses if/else conditions to match what the user typed and pick a pre-written reply. Simple but effective for specific tasks like FAQs!",
      },
      {
        question: "Why do we save conversation_history in an AI chatbot?",
        options: ["To save the conversation to a file", "So the AI remembers context from earlier in the chat", "To make the program faster", "Because the API requires it"],
        correct: 1,
        explanation: "By sending the full conversation history with each API request, the AI can reference what was said earlier — just like how you remember what someone said at the start of a conversation!",
      },
      {
        question: "What does the 'system' message in the OpenAI API do?",
        options: ["Asks the AI a question", "Tells the AI who the user is", "Gives the AI its personality and instructions", "Checks if the API is working"],
        correct: 2,
        explanation: "The 'system' message gives the AI its instructions and personality! It's like briefing an actor on their character before a play. The AI follows these instructions throughout the conversation.",
      },
    ],
    keyLearnings: [
      "Rule-based chatbots use if/else to match keywords — simple but effective",
      "A knowledge base dictionary lets your bot answer questions about specific topics",
      "AI chatbots use a 'system' message to define their personality and rules",
      "Sending conversation_history with each API call gives the AI memory of the chat",
      "The system prompt is like briefing an actor — it shapes every reply",
      "You can give any chatbot a name, personality, and area of expertise",
    ],
    funFact: "The first chatbot ever was called ELIZA, created in 1966 at MIT. It was a therapist bot, and people would talk to it for hours — even though it just matched simple patterns! 🤖",
    nextPreview: "Day 13: AI Image Magic — teach computers to see and describe images!",
  },

  {
    id: 13,
    title: "AI Image Magic",
    emoji: "🎨",
    tagline: "Teach AI to see the world!",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    duration: "Day 13",
    topics: ["How computers see images", "Pixels and colours", "Image recognition AI", "Generate AI images"],
    intro: "When you see a cat photo, your brain instantly knows it's a cat. But computers see millions of tiny coloured dots! Teaching computers to make sense of those dots is one of AI's greatest achievements. Today we explore computer vision — and we'll use AI to describe and even create images! 🖼️",
    sections: [
      {
        title: "How Computers See Images — Pixels! 🔍",
        content: "Every digital image is made of pixels — tiny coloured squares. A 1080p screen has over 2 million pixels! Each pixel has a colour described by 3 numbers: Red, Green, Blue (RGB).",
        code: `# Understanding pixels and colours!
# Colours are made of Red, Green, Blue (0-255 each)

# Some famous colours as RGB:
colours = {
    "red":    (255, 0, 0),
    "green":  (0, 255, 0),
    "blue":   (0, 0, 255),
    "white":  (255, 255, 255),
    "black":  (0, 0, 0),
    "yellow": (255, 255, 0),
    "purple": (128, 0, 128),
}

for name, rgb in colours.items():
    r, g, b = rgb
    print(f"{name}: Red={r}, Green={g}, Blue={b}")

# A 4x4 pixel tiny image might look like this:
tiny_image = [
    [(255,0,0), (255,0,0), (0,255,0), (0,255,0)],
    [(255,0,0), (255,0,0), (0,255,0), (0,255,0)],
    [(0,0,255), (0,0,255), (255,255,0), (255,255,0)],
    [(0,0,255), (0,0,255), (255,255,0), (255,255,0)],
]
print("Our tiny 4x4 pixel image has", len(tiny_image[0]) * len(tiny_image), "pixels!")`,
      },
      {
        title: "How AI Recognises Images 🧠",
        content: "AI learns to recognise images by studying millions of labelled examples. It learns which patterns of pixels mean 'cat' vs 'dog' vs 'pizza'!",
        code: `# Imagine a VERY simple AI that recognises colours
def identify_dominant_colour(r, g, b):
    if r > g and r > b:
        return "This is mostly RED 🔴"
    elif g > r and g > b:
        return "This is mostly GREEN 🟢"
    elif b > r and b > g:
        return "This is mostly BLUE 🔵"
    elif r == g and r > b:
        return "This is mostly YELLOW 🟡"
    else:
        return "This is a mix of colours 🌈"

# Test our simple "AI"
print(identify_dominant_colour(200, 50, 50))   # RED
print(identify_dominant_colour(30, 180, 30))   # GREEN
print(identify_dominant_colour(20, 20, 220))   # BLUE

# Real AI is millions of times more complex —
# but the idea is the same: find patterns!`,
        analogy: "Real image AI works like this: it has millions of tiny 'detectors'. Some detect edges, some detect circles, some detect textures. Layer upon layer, these combine to recognise complex things — like a cat's pointy ears and whiskers! 🐱",
      },
      {
        title: "Ask AI to Describe an Image 🔍",
        content: "Modern AI can look at ANY image and describe what it sees! This is called Vision AI or Multimodal AI.",
        code: `from openai import OpenAI
import base64

client = OpenAI(api_key="YOUR_API_KEY")

def describe_image_from_url(image_url):
    response = client.chat.completions.create(
        model="gpt-4o",   # This model can see images!
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {"url": image_url}
                    },
                    {
                        "type": "text",
                        "text": "Describe this image in a fun way for a 12-year-old!"
                    }
                ]
            }
        ]
    )
    return response.choices[0].message.content

# Use any public image URL!
image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/320px-Cat03.jpg"
description = describe_image_from_url(image_url)
print("AI sees: " + description)`,
      },
      {
        title: "Generate AI Images! 🎨",
        content: "AI can also CREATE images from text descriptions! This is called Generative AI. DALL-E, Midjourney, and Stable Diffusion are famous examples.",
        code: `from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")

def generate_image(prompt):
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    image_url = response.data[0].url
    return image_url

# Generate an image with a text description!
my_prompt = "A cute robot learning to code Python, digital art, colorful, kids cartoon style"
url = generate_image(my_prompt)
print("Your image is ready!")
print("Open this URL in a browser: " + url)

# Tips for better prompts:
# - Be specific: "orange tabby cat" not just "cat"
# - Add style: "watercolour", "pixel art", "3D render"
# - Add mood: "happy", "mysterious", "adventurous"`,
      },
    ],
    challenge: {
      title: "Your Mission: The AI Art Gallery",
      description: "Generate 3 images with creative prompts and describe what the AI created!",
      code: `# AI ART GALLERY 🖼️

# Write 3 creative prompts for image generation!
prompts = [
    "___",  # Something from nature
    "___",  # Something imaginary / fantasy
    "___",  # Something futuristic
]

# For each prompt, think about:
# 1. The main subject (who/what is in it?)
# 2. The style (cartoon, realistic, watercolour, pixel art?)
# 3. The mood (happy, magical, exciting?)
# 4. The setting (where is it? What time of day?)

# Example of a GREAT prompt:
good_prompt = """
A friendly dragon made of clouds, floating above a
rainbow-coloured mountain, soft watercolour style,
gentle glowing light, magical and peaceful mood
"""

# BONUS: After generating, write what the AI created
# and if it matched what you imagined!`,
    },
    quiz: [
      {
        question: "What are pixels?",
        options: ["The software inside a camera", "Tiny coloured squares that make up digital images", "The brightness of a screen", "A type of Python library"],
        correct: 1,
        explanation: "Pixels are the tiny coloured squares that make up every digital image! A typical smartphone photo has 12 million pixels. Each pixel has a colour defined by Red, Green, and Blue values (0-255).",
      },
      {
        question: "What does RGB stand for in image colours?",
        options: ["Really Good Brightness", "Red Green Blue", "Random Generated Background", "Resolution Grid Bits"],
        correct: 1,
        explanation: "RGB = Red Green Blue! Every colour on a digital screen is made by mixing these three colours at different intensities (0-255 each). It's like mixing paint, but with light!",
      },
      {
        question: "What is a 'prompt' in AI image generation?",
        options: ["A bug in the AI code", "The text description you give the AI to create an image", "The file format of the image", "The speed at which AI generates images"],
        correct: 1,
        explanation: "A prompt is your text description that tells the AI what to create. Better, more detailed prompts = better images! 'A cute dragon flying over a castle at sunset, watercolour style' is much better than just 'dragon'.",
      },
    ],
    keyLearnings: [
      "Every digital image is made of pixels — tiny coloured squares with RGB values",
      "RGB stands for Red, Green, Blue — all colours are a mix of these three",
      "Computer Vision AI finds patterns in pixel data to recognise objects",
      "Vision AI models like GPT-4o can describe the contents of any image",
      "DALL-E and similar models generate images from text descriptions (prompts)",
      "Better prompts = better images: be specific about subject, style, and mood",
    ],
    funFact: "DALL-E 3 can generate an image in about 10 seconds. If a human artist worked 8 hours a day, that same image might take them a day or more. But the human artist has creativity and emotion — that's still special! 🎨",
    nextPreview: "Day 14: Your Capstone Project — build YOUR OWN AI app from scratch!",
  },

  {
    id: 14,
    title: "Your AI App — Capstone!",
    emoji: "🚀",
    tagline: "Build YOUR dream AI project!",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    duration: "Day 14",
    topics: ["Choosing your project", "Planning and designing", "Building step by step", "Testing and improving"],
    intro: "This is YOUR day! For 13 modules you've been learning Python skills and AI tools. Now it's time to combine them into something YOU designed. Choose a project idea, plan it out, build it, and test it. This is what real developers do every day! You've totally got this! 💪",
    sections: [
      {
        title: "Choose Your Project 🎯",
        content: "Here are 5 amazing project ideas. Pick the one that excites you most — or combine elements from multiple!",
        code: `# PROJECT OPTIONS — Pick your favourite! 🌟

# 1. 📖 STORY GENERATOR
#    Type a genre and character, get a unique story!
#    Skills: OpenAI API, user input, strings

# 2. 🧠 SMART QUIZ MASTER
#    AI generates quiz questions on any topic you choose
#    Skills: OpenAI API, lists, loops, score tracking

# 3. 🎯 PERSONAL COACH BOT
#    A chatbot that gives advice on homework, fitness, or coding
#    Skills: OpenAI API, chatbot logic, conversation history

# 4. 🍕 RECIPE INVENTOR
#    Type ingredients you have, get a recipe + cooking steps!
#    Skills: OpenAI API, user input, string formatting

# 5. 🌍 LANGUAGE BUDDY
#    Translate words and learn phrases in another language
#    Skills: OpenAI API, dictionaries, loops

# Pick one and move to the PLANNING stage!`,
      },
      {
        title: "Plan Before You Code 📋",
        content: "Real developers plan first! A 5-minute plan saves an hour of confusion. Answer these questions about your project:",
        code: `# MY PROJECT PLAN
# Fill this in BEFORE you start coding!

project_name = "___"
what_it_does = "___"  # One sentence description

# What will the user DO?
user_steps = [
    "1. The user types ___",
    "2. The program asks ___",
    "3. The AI generates ___",
    "4. The user sees ___",
]

# What Python concepts will I use?
concepts_needed = [
    "variables - to store ___",
    "functions - to ___",
    "loops - to ___",
    "dictionaries - to ___",
    "OpenAI API - to ___",
]

# What's the MVP (Minimum Viable Product)?
# = The simplest version that works!
mvp = "A program that asks for ___ and returns ___"`,
        tip: "Start with the simplest version (MVP) that works. Then add cool features one by one. Professional developers call this 'iterating'!",
      },
      {
        title: "Template: Story Generator 📖",
        content: "Here's a full starter template for the Story Generator project. Customise it to make it yours!",
        code: `from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")

def generate_story(genre, main_character, setting, theme):
    prompt = f"""Write a short, exciting story (300 words) for kids aged 10-14.

    Genre: {genre}
    Main character: {main_character}
    Setting: {setting}
    Theme: {theme}

    Make it fun, age-appropriate, and end with a positive message!
    Include dialogue and vivid descriptions."""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

def main():
    print("=== 📖 AI STORY GENERATOR ===")
    print("Let's create an amazing story!\n")

    genre = input("Genre (adventure/mystery/fantasy/sci-fi): ")
    character = input("Main character's name and type: ")
    setting = input("Where does the story happen? ")
    theme = input("Story theme (friendship/courage/discovery): ")

    print("\n✨ Generating your story...\n")
    story = generate_story(genre, character, setting, theme)

    print("=" * 50)
    print(story)
    print("=" * 50)

    again = input("\nCreate another story? (yes/no): ")
    if again.lower() == "yes":
        main()

main()`,
      },
      {
        title: "Test, Fix, and Polish 🔧",
        content: "Once your basic version works, test it thoroughly and add finishing touches!",
        code: `# TESTING CHECKLIST ✅
# Go through this when you think you're done!

testing_checklist = {
    "happy_path": "Does it work when I use it normally?",
    "edge_cases": "What if I type nothing? Type weird characters?",
    "user_experience": "Is the output nicely formatted and readable?",
    "error_handling": "Does it crash or handle mistakes gracefully?",
    "wow_factor": "Does it make the user say 'wow, that's cool!'?",
}

# POLISH IDEAS:
polish_ideas = [
    "Add a loading message while AI thinks (✨ Generating...)",
    "Add emojis to make output more fun",
    "Format output nicely with === borders ===",
    "Ask if they want to try again at the end",
    "Save results to a text file",
    "Add a 'difficulty' or 'style' setting",
]

# REMEMBER: A working simple version is better
# than a broken complex version!
print("Build it → Test it → Improve it → Repeat! 🔄")`,
      },
    ],
    challenge: {
      title: "Your Mission: Build It!",
      description: "Build your chosen project! Start simple, get it working, then add one fun extra feature.",
      code: `# START YOUR PROJECT HERE!

# Step 1: Import what you need
from openai import OpenAI
# import random  # if needed
# import requests  # if needed

client = OpenAI(api_key="YOUR_API_KEY")

# Step 2: Define your main function
def my_awesome_app():
    print("=== YOUR APP NAME ===")

    # Step 3: Get input from the user
    user_input = input("___: ")

    # Step 4: Call the AI
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are ___"},
            {"role": "user", "content": user_input}
        ]
    )

    result = response.choices[0].message.content

    # Step 5: Display the output nicely
    print("\\n" + "=" * 40)
    print(result)
    print("=" * 40)

# Run it!
my_awesome_app()`,
    },
    quiz: [
      {
        question: "What is an MVP in software development?",
        options: ["Most Valuable Programmer", "Minimum Viable Product — the simplest version that works", "Maximum Visual Performance", "Multi-Variable Program"],
        correct: 1,
        explanation: "MVP = Minimum Viable Product! It's the simplest version of your app that actually does the main job. Build the MVP first, make it work, THEN add extra features. This is how all professional apps are built!",
      },
      {
        question: "What should you do BEFORE writing code for a new project?",
        options: ["Just start typing and figure it out later", "Plan what the app does, who uses it, and what steps it takes", "Copy code from the internet", "Ask AI to write it for you"],
        correct: 1,
        explanation: "Planning first saves SO much time! Knowing what your app does, who uses it, and what steps it takes helps you write focused code. Professional developers spend 30-50% of their time planning!",
      },
      {
        question: "What's the best strategy when your code has a bug?",
        options: ["Delete everything and start over", "Add print() statements to check values at each step", "Ignore it and hope it goes away", "Change random things until it works"],
        correct: 1,
        explanation: "Adding print() statements to check what your variables contain at each step is the most reliable debugging technique! It's called 'print debugging' and even professional developers use it.",
      },
    ],
    keyLearnings: [
      "MVP = Minimum Viable Product — the simplest version that actually works",
      "Plan before you code: what does it do, who uses it, what are the steps?",
      "Build → Test → Improve → Repeat is how every real app gets made",
      "The system prompt shapes your AI's whole personality — make it specific",
      "Test with edge cases: what if the user types nothing, or something unexpected?",
      "A well-presented working app beats a half-built complex one every time",
    ],
    funFact: "WhatsApp was built by just 2 engineers at first! Instagram launched with only 13 employees. Great apps start small and simple, then grow. Your capstone project could be the seed of something amazing! 🌱",
    nextPreview: "Day 15: DEMO DAY! Show off your creation, get your certificate, and discover what to learn next!",
  },

  {
    id: 15,
    title: "Demo Day & Graduation!",
    emoji: "🎓",
    tagline: "You did it — celebrate and show off!",
    color: "text-fuchsia-600",
    bgColor: "bg-fuchsia-50",
    borderColor: "border-fuchsia-200",
    duration: "Day 15",
    topics: ["Present your project", "What you've learned", "What's next in coding", "Your coding journey"],
    intro: "🎉 CONGRATULATIONS! You made it to Day 15! Over the past two weeks you went from 'Hello World' to building actual AI apps. That is INCREDIBLE. Today we celebrate what you've built, share it with others, and dream about what comes next. You're not just a student anymore — you're a coder! 🚀",
    sections: [
      {
        title: "Your Journey — Look How Far You've Come! 🗺️",
        content: "Let's look at EVERYTHING you learned in just 15 days. This is seriously impressive!",
        code: `# EVERYTHING YOU LEARNED IN 15 DAYS! 🌟

journey = {
    "Day 1":  "Wrote your first Python program with print()",
    "Day 2":  "Mastered Numbers and Strings — the building blocks",
    "Day 3":  "Created Variables — the memory boxes of code",
    "Day 4":  "Made decisions with If/Elif/Else",
    "Day 5":  "Automated tasks with For and While loops",
    "Day 6":  "Organised data in Lists",
    "Day 7":  "Built reusable Functions — your own commands",
    "Day 8":  "Organised complex data with Dictionaries",
    "Day 9":  "Built a complete game — the Number Guesser!",
    "Day 10": "Understood how AI thinks and learns",
    "Day 11": "Connected to the internet with APIs",
    "Day 12": "Created your own AI chatbot",
    "Day 13": "Worked with images using Computer Vision AI",
    "Day 14": "Built your own AI-powered app",
    "Day 15": "GRADUATED as a Python + AI programmer! 🎓",
}

for day, achievement in journey.items():
    print(f"✅ {day}: {achievement}")

print("\\n🌟 Total: 15 days, unlimited possibilities!")`,
      },
      {
        title: "How to Present Your Project 🎤",
        content: "Sharing your work is an important skill. Here's a simple structure for presenting your capstone project:",
        code: `# YOUR PRESENTATION SCRIPT (2-3 minutes)

presentation_structure = {
    "1. Intro (20 sec)": [
        "My name is ___ and my project is called ___",
        "It's an AI app that ___",
    ],
    "2. The Problem (30 sec)": [
        "I built this because ___",
        "It helps people who ___",
    ],
    "3. LIVE DEMO (60 sec)": [
        "Watch me use it! I'll type ___ and...",
        "See how it ___ — isn't that cool?",
    ],
    "4. How I Built It (30 sec)": [
        "I used Python with the OpenAI API",
        "The trickiest part was ___",
        "I solved it by ___",
    ],
    "5. What's Next (20 sec)": [
        "If I had more time, I'd add ___",
        "I'm really proud of ___",
    ],
}

for section, points in presentation_structure.items():
    print(f"\\n{section}:")
    for point in points:
        print(f"  • {point}")`,
        tip: "Don't try to explain the code — explain the IDEA and show it WORKING. Non-coders should be amazed by what it does, not confused by how! 🎭",
      },
      {
        title: "What Comes Next — Your Coding Paths 🛤️",
        content: "Python + AI is just the beginning! Here are the amazing directions you can go from here:",
        code: `# YOUR FUTURE CODING PATHS 🗺️

coding_paths = {
    "🌐 Web Development": {
        "build": "Websites and web apps",
        "learn_next": ["HTML", "CSS", "JavaScript", "React"],
        "cool_projects": "Your own website, social app, blog",
        "time": "3-6 months to get good",
    },
    "🎮 Game Development": {
        "build": "Your own video games!",
        "learn_next": ["Pygame (Python)", "Unity (C#)", "Godot"],
        "cool_projects": "2D platformer, puzzle game, RPG",
        "time": "6-12 months to make a full game",
    },
    "🤖 AI & Data Science": {
        "build": "Smarter AI apps and data analysis",
        "learn_next": ["pandas", "matplotlib", "scikit-learn", "TensorFlow"],
        "cool_projects": "Predict sports scores, analyse data, train your own AI",
        "time": "6 months to start seeing results",
    },
    "📱 Mobile Apps": {
        "build": "iPhone and Android apps",
        "learn_next": ["Swift (iOS)", "Flutter", "React Native"],
        "cool_projects": "Fitness tracker, game, utility app",
        "time": "6-12 months",
    },
    "🔐 Cybersecurity": {
        "build": "Protect systems and find vulnerabilities",
        "learn_next": ["Networking", "Linux", "Ethical Hacking basics"],
        "cool_projects": "Password manager, security scanner",
        "time": "1-2 years to specialise",
    },
}

for path, info in coding_paths.items():
    print(f"\\n{path}")
    print(f"  Build: {info['build']}")
    print(f"  Learn: {', '.join(info['learn_next'])}")`,
      },
      {
        title: "Resources to Keep Learning 📚",
        content: "Your coding journey doesn't end here — it just begins! Here are the best free resources:",
        code: `# BEST FREE CODING RESOURCES 🆓

resources = {
    "Python": [
        "python.org — official Python tutorials",
        "replit.com — code in your browser, no install needed",
        "CS50P (Harvard) — free Python course on edX",
    ],
    "AI & Machine Learning": [
        "fast.ai — practical deep learning (free)",
        "Kaggle.com — datasets and AI competitions",
        "Google ML Crash Course (free)",
    ],
    "Fun Practice": [
        "HackerRank — Python challenges",
        "LeetCode — problem solving (start Easy!)",
        "Advent of Code — fun December puzzles",
        "Codewars — level up your skills",
    ],
    "Build Projects": [
        "GitHub — store your code and show the world",
        "Replit — share your projects easily",
        "Hackathons — build projects with others!",
    ],
}

for category, links in resources.items():
    print(f"\\n📂 {category}:")
    for resource in links:
        print(f"   • {resource}")

print("\\n💡 TIP: The best way to learn is to BUILD things you actually care about!")`,
      },
    ],
    challenge: {
      title: "Your Mission: The Reflection Letter",
      description: "Write a letter to your future self (or to a friend) about what you learned this summer!",
      code: `# WRITE YOUR REFLECTION 📝
# (Answer these in your notebook or as a Python string!)

my_reflection = """
Dear Future Me,

This summer I learned Python and AI programming.

The thing that SURPRISED me most was:
___

The hardest thing I learned was:
___
I overcame it by:
___

My favourite thing I built was:
___
because ___

If I could tell a friend ONE thing about coding, it would be:
___

My coding goal for the next 6 months is:
___

I now know that AI is not magic — it's:
___

Signed,
___ (The Coder)
"""

print(my_reflection)

# BONUS: Email this to yourself to read in 1 year!
# See how much MORE you'll know then! 🚀`,
    },
    quiz: [
      {
        question: "What is the most important thing to do after building a project?",
        options: ["Delete it and start a harder one", "Share it and get feedback from others", "Keep it secret so no one steals it", "Only show it to your teacher"],
        correct: 1,
        explanation: "Share your work! Getting feedback helps you improve, showing your work builds your portfolio, and inspiring others feels amazing. GitHub is a great place to share code projects with the world!",
      },
      {
        question: "What's the best way to keep improving your coding skills?",
        options: ["Read programming books for hours", "Build projects you personally find interesting", "Only do coding tutorials", "Wait until school teaches you more"],
        correct: 1,
        explanation: "Build things you actually CARE about! When a project excites you, you'll push through the hard parts. The best programmers are driven by curiosity and passion — not just assignments.",
      },
      {
        question: "What does Python + AI knowledge qualify you to build?",
        options: ["Only simple calculator programs", "Websites only", "Chatbots, AI apps, games, data tools, and much more!", "Only things covered in this camp"],
        correct: 2,
        explanation: "With Python and AI skills, you can build chatbots, recommendation systems, image tools, web scrapers, games, data dashboards, and SO much more! You have a real, professional superpower now. 🦸",
      },
    ],
    keyLearnings: [
      "In 15 days you went from print('Hello') to building a real AI app — that's huge",
      "Python + AI is a professional skill used by engineers at Google, NASA, and Netflix",
      "The best way to keep improving is to build projects you personally care about",
      "GitHub is where coders share their work — start putting your projects there",
      "Paths ahead: Web Dev, Game Dev, AI/Data Science, Mobile Apps, Cybersecurity",
      "The difference between a beginner and expert is knowing how to figure things out",
    ],
    funFact: "The average professional programmer makes mistakes and fixes bugs almost every day. The difference between a beginner and an expert isn't knowing everything — it's knowing how to figure things out! You already know how to do that. 🌟",
    nextPreview: "Your coding adventure continues — the world of code is waiting for you!",
  },
];
