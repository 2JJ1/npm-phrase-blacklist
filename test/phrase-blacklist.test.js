const phraseBlacklist = require('../index');

test('Check adding a phrase using BanPhrase then removing using UnbanPhrase', () => {
    const oldPhraseCount = phraseBlacklist.bannedContainment.length;
    const oldLastItem = phraseBlacklist.bannedContainment[oldPhraseCount - 1];

    phraseBlacklist.BanPhrase('testing');

    expect(phraseBlacklist.bannedContainment.length).toBe(oldPhraseCount + 1);
    expect(phraseBlacklist.bannedContainment[oldPhraseCount]).toBe('testing');

    phraseBlacklist.UnbanPhrase('testing');

    expect(phraseBlacklist.bannedContainment.length).toBe(oldPhraseCount);
    expect(phraseBlacklist.bannedContainment[oldPhraseCount - 1]).toBe(oldLastItem);
});

test('Check adding a phrase using BanPhrases then removing using UnbanPhrases', () => {
    const oldPhraseCount = phraseBlacklist.bannedContainment.length;
    const oldLastItem = phraseBlacklist.bannedContainment[oldPhraseCount - 1];
    const banPhrases = [
        'test1',
        'test2',
        'test3',
        'test4',
        'test5',
    ];

    phraseBlacklist.BanPhrases(banPhrases);

    expect(phraseBlacklist.bannedContainment.length).toBe(oldPhraseCount + 5);
    expect(phraseBlacklist.bannedContainment[oldPhraseCount]).toBe('test1');
    expect(phraseBlacklist.bannedContainment[oldPhraseCount + 1]).toBe('test2');
    expect(phraseBlacklist.bannedContainment[oldPhraseCount + 2]).toBe('test3');
    expect(phraseBlacklist.bannedContainment[oldPhraseCount + 3]).toBe('test4');
    expect(phraseBlacklist.bannedContainment[oldPhraseCount + 4]).toBe('test5');

    phraseBlacklist.UnbanPhrases(banPhrases);

    expect(phraseBlacklist.bannedContainment.length).toBe(oldPhraseCount);
    expect(phraseBlacklist.bannedContainment[oldPhraseCount - 1]).toBe(oldLastItem);
});

