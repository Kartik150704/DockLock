const fs = require("fs").promises;
const solc = require("solc");

async function main() {
  // Load the contract source code
  const sourceCode = await fs.readFile("./contracts/1.sol", "utf8");
  // Get the contract name from the file name or other source
  const contractName = "FileStorage"; // Replace with your contract's name

  // Compile the source code and retrieve the ABI and Bytecode
  const { abi, bytecode } = compile(sourceCode, contractName);

  // Create the contract interface object
  const contractInterface = {
    name: contractName,
    sourceCode: sourceCode,
    abi: abi,
    bytecode: bytecode,
  };

  // Store the contract interface into a JSON file
  const artifact = JSON.stringify(contractInterface, null, 2);
  await fs.writeFile("./src/FileStorage.json", artifact);
  await fs.writeFile("./src/Components/Blockchain/FileStorage.json", artifact);

  console.log(`Contract interface saved to ./src/FileStorage.json`);
}

function compile(sourceCode, contractName) {
  // Create the Solidity Compiler Standard Input and Output JSON
  const input = {
    language: "Solidity",
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
  };
  // Parse the compiler output to retrieve the ABI and Bytecode
  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts.main[contractName];
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}

main().then(() => process.exit(0));