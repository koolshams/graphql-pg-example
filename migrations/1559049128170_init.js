exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('tab', {
        id: { type: 'varchar(128)', primaryKey: true},
        name: { type: 'varchar(1024)', notNull: true },
        updated: {
            type: 'bigint'
        }
    });
    pgm.createTable('widget', {
        id: { type: 'varchar(128)', primaryKey: true},
        tabId: {
            type: 'varchar(128)', notNull: true, references: '"tab"',
            onDelete: "cascade"
        },
        updated: {
            type: 'bigint'
        },
        position: { type: "text", notNull: true },
        state: { type: "text", notNull: true }
    });
};

exports.down = pgm => {
    pgm.dropTable('widget');
    pgm.dropTable('tab');
};
