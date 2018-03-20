module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        development: {
            host: "localhost",
            port: 7545,
            network_id: "*" // Match any network id
        },
        rinkeby: {
            host: "localhost",
            port: 8545,
            network_id: 4
        },
        live: {
            host: "localhost",
            port: 8545,
            network_id: 1
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
