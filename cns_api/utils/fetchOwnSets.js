module.exports = new Promise(function(id) {
    User.findById(id, "sets").then(data => {
        const setsID = data.sets;

        if(data.sets.length == 0) {
            resolve(false);
        } else {
            var ownSets = [];
            function fill(i) {
                if(i < setsID.length) {
                    Set.findOne({ _id: setsID[i] }, "name language").then(data => {
                        const set = { 
                            id: data._id,
                            name: data.name,
                            language: data.language
                        };
                        ownSets[i] = set;
                        fill(i+1);
                    });
                } else {
                    resolve(ownSets);
                }
            }
            fill(0);
        };
    });
});