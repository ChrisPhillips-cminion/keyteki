describe('Key Hammer', function () {
    describe("Key Hammer's ability", function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    house: 'shadows',
                    hand: ['key-hammer', 'key-hammer', 'urchin']
                },
                player2: {
                    amber: 6,
                    hand: ['snufflegator', 'full-moon', 'hunting-witch', 'flaxia', 'key-charge']
                }
            });

            this.keyHammer1 = this.player1.hand[0];
            this.keyHammer2 = this.player1.hand[1];
        });

        it('should unforge a key when one was forged', function () {
            this.player1.endTurn();
            this.player2.forgeKey('Red');
            expect(this.player2.player.keys.red).toBe(true);
            expect(this.player2.player.keys.blue).toBe(false);
            expect(this.player2.player.keys.yellow).toBe(false);
            expect(this.player2.amber).toBe(0);
            this.player2.clickPrompt('untamed');
            this.player2.endTurn();
            this.player1.clickPrompt('dis');
            this.player1.play(this.keyHammer1);
            expect(this.player1.amber).toBe(1);
            expect(this.player2.player.keys.red).toBe(false);
            expect(this.player2.player.keys.blue).toBe(false);
            expect(this.player2.player.keys.yellow).toBe(false);
            expect(this.player2.amber).toBe(6);
        });

        it('should not unforge a key when one was not forged', function () {
            this.player1.endTurn();
            this.player2.forgeKey('Red');
            expect(this.player2.player.keys.red).toBe(true);
            expect(this.player2.player.keys.blue).toBe(false);
            expect(this.player2.player.keys.yellow).toBe(false);
            expect(this.player2.amber).toBe(0);
            this.player2.clickPrompt('untamed');
            this.player2.endTurn();
            this.player1.clickPrompt('dis');
            this.player1.endTurn();
            this.player2.clickPrompt('untamed');
            this.player2.endTurn();
            this.player1.clickPrompt('dis');
            this.player1.play(this.keyHammer1);
            expect(this.player2.player.keys.red).toBe(true);
            expect(this.player2.player.keys.blue).toBe(false);
            expect(this.player2.player.keys.yellow).toBe(false);
            expect(this.player2.amber).toBe(6);
        });

        it('only unforge one key when two were forged previous turn', function () {
            this.player1.endTurn();
            this.player2.forgeKey('Red');
            expect(this.player2.player.keys.red).toBe(true);
            expect(this.player2.player.keys.blue).toBe(false);
            expect(this.player2.player.keys.yellow).toBe(false);
            expect(this.player2.amber).toBe(0);
            this.player2.clickPrompt('untamed');
            this.player2.play(this.fullMoon);
            this.player2.play(this.huntingWitch);
            this.player2.play(this.flaxia);
            this.player2.clickCard(this.flaxia);
            this.player2.clickPrompt('Full Moon');
            this.player2.play(this.snufflegator);
            this.player2.clickPrompt('Full Moon');
            expect(this.player2.amber).toBe(7);
            this.player2.play(this.keyCharge);
            this.player2.clickPrompt('Yes');
            this.player2.forgeKey('Blue');
            expect(this.player2.amber).toBe(0);
            expect(this.player2.player.keys.red).toBe(true);
            expect(this.player2.player.keys.blue).toBe(true);
            expect(this.player2.player.keys.yellow).toBe(false);
            this.player2.endTurn();
            this.player1.clickPrompt('dis');
            this.player1.play(this.keyHammer1);
            this.player1.unforgeKey('Red');
            expect(this.player2.player.keys.red).toBe(false);
            expect(this.player2.player.keys.blue).toBe(true);
            expect(this.player2.player.keys.yellow).toBe(false);
            expect(this.player2.amber).toBe(6);
        });

        it('unforge two keys when two were forged previous turn', function () {
            this.player1.endTurn();
            this.player2.forgeKey('Red');
            expect(this.player2.player.keys.red).toBe(true);
            expect(this.player2.player.keys.blue).toBe(false);
            expect(this.player2.player.keys.yellow).toBe(false);
            expect(this.player2.amber).toBe(0);
            this.player2.clickPrompt('untamed');
            this.player2.play(this.fullMoon);
            this.player2.play(this.huntingWitch);
            this.player2.play(this.flaxia);
            this.player2.clickCard(this.flaxia);
            this.player2.clickPrompt('Full Moon');
            this.player2.play(this.snufflegator);
            this.player2.clickPrompt('Full Moon');
            expect(this.player2.amber).toBe(7);
            this.player2.play(this.keyCharge);
            this.player2.clickPrompt('Yes');
            this.player2.forgeKey('Blue');
            expect(this.player2.amber).toBe(0);
            expect(this.player2.player.keys.red).toBe(true);
            expect(this.player2.player.keys.blue).toBe(true);
            expect(this.player2.player.keys.yellow).toBe(false);
            this.player2.endTurn();
            this.player1.clickPrompt('dis');
            this.player1.play(this.keyHammer1);
            expect(this.player1).toHavePromptButton('Red');
            expect(this.player1).toHavePromptButton('Blue');
            expect(this.player1).not.toHavePromptButton('Yellow');
            this.player1.unforgeKey('Red');
            expect(this.player2.player.keys.red).toBe(false);
            expect(this.player2.player.keys.blue).toBe(true);
            expect(this.player2.player.keys.yellow).toBe(false);
            expect(this.player2.amber).toBe(6);
            this.player1.play(this.keyHammer2);
            expect(this.player2.player.keys.red).toBe(false);
            expect(this.player2.player.keys.blue).toBe(false);
            expect(this.player2.player.keys.yellow).toBe(false);
            expect(this.player2.amber).toBe(12);
        });
    });
});
