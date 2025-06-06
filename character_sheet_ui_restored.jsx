import React, { useState } from "react";

const OBOJIMA_CLASSES = [
  "Warlock", "Druid", "Fighter", "Barbarian", "Monk", "Ranger",
  "Bard", "Sorcerer", "Rogue", "Paladin", "Wizard"
];

const OBOJIMA_SUBCLASSES = [
  "Lantern Warlock", "Circle of the Petal", "Spirit-Fused", "Path of the Belly Brewer",
  "Sheep Dragon Shepherd", "Corrupted Ranger", "College of Masks", "Oni Bloodline",
  "Waxwork Rogue", "Oath of the River", "Origami Mage"
];

const OBOJIMA_ANCESTRIES = ["Human", "Dara", "Elves", "Nakudama"];

const ATTRIBUTE_VALUES = [+2, +1, +1, 0, 0, -1];
const ATTRIBUTES = ['Agility', 'Strength', 'Finesse', 'Instinct', 'Presence', 'Knowledge'];

const ATTRIBUTE_DESCRIPTIONS = {
  Agility: ["Sprint", "Leap", "Maneuver"],
  Strength: ["Lift", "Smash", "Grapple"],
  Finesse: ["Control", "HIde", "Tinker"],
  Instinct: ["Perceive", "Sense", "Navigate"],
  Presence: ["Charm", "Perform", "Deceive"],
  Knowledge: ["Recall", "Analyze", "Comprehend"]
};

const FillableBubbles = ({ count, filledStart = 0, grayedOutStart = Infinity }) => {
  const [filled, setFilled] = useState(
    Array.from({ length: count }, (_, i) => i < filledStart)
  );

  const toggleBubble = (index) => {
    const updated = [...filled];
    updated[index] = !updated[index];
    setFilled(updated);
  };

  return (
    <div className="flex gap-1 flex-wrap">
      {filled.map((isFilled, i) => (
        <div
          key={i}
          onClick={() => toggleBubble(i)}
          className={`w-4 h-4 rounded-full border cursor-pointer transition-colors duration-150 ${
            isFilled ? "bg-gray-800 border-gray-800" :
            i >= grayedOutStart ? "bg-gray-300 border-gray-400" : "border-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

const CharacterSheet = () => {
  const [level, setLevel] = useState(1);

  const getAttributeOptions = () => {
    const base = ATTRIBUTE_VALUES.slice();
    for (let i = 1; i < level; i++) {
      if (i % 1 === 0) base.push(+2);
    }
    return base.sort((a, b) => b - a);
  };

  const proficiencyFilled = 1 + (level >= 2) + (level >= 5) + (level >= 8);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 text-sm">
      {/* Left Column */}
      <div className="space-y-4">
        <div>
          <label className="block font-bold text-lg">Class</label>
          <select className="w-full border rounded p-1">
            {OBOJIMA_CLASSES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block font-bold">Evasion</label>
            <input className="w-full border rounded p-1" placeholder="Start at 10" />
          </div>
          <div className="flex-1">
            <label className="block font-bold">Armor</label>
            <input className="w-full border rounded p-1 mb-1" placeholder="Enter Armor" />
          </div>
        </div>
        <div className="flex justify-end">
          <FillableBubbles count={12} />
        </div>

        <div>
          <label className="block font-bold text-lg">Damage & Health</label>
          <div className="text-xs italic">Add your current level to your damage thresholds.</div>
          <div className="grid grid-cols-3 gap-2">
            <div>Mark 1 HP <input className="border p-1 w-16" /></div>
            <div>Mark 2 HP <input className="border p-1 w-16" /></div>
            <div>Mark 3 HP <input className="border p-1 w-16" /></div>
          </div>
          <div className="mt-2">
            <label className="block font-bold">HP</label>
            <FillableBubbles count={12} />
          </div>
          <div className="mt-2">
            <label className="block font-bold">Stress</label>
            <FillableBubbles count={12} />
          </div>
        </div>

        <div>
          <label className="block font-bold text-lg">Hope</label>
          <div className="text-xs italic mb-1">Spend a Hope to use an experience or help an ally.</div>
          <FillableBubbles count={6} />
          <div className="text-xs italic mt-1">Make a Scene: Spend 3 Hope to temporarily Distract a target within Close Range, giving them a -2 penalty to their Difficulty.</div>
        </div>

        <div>
          <label className="block font-bold text-lg">Experience</label>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <input className="w-full border rounded p-1" placeholder="Experience option..." />
              <input className="w-12 border rounded p-1 text-center" placeholder="Lv" maxLength={2} />
            </div>
          ))}
        </div>

        <div>
          <label className="block font-bold text-lg">Gold</label>
          <div className="grid grid-cols-3 text-left font-semibold mb-1">
            <div>Handfuls</div><div>Bags</div><div>Chest</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <FillableBubbles count={9} />
            <FillableBubbles count={9} />
            <FillableBubbles count={1} />
          </div>
        </div>

        <div>
          <label className="block font-bold text-lg">Class Feature</label>
          <textarea className="w-full border rounded p-1" rows={8} placeholder="Class Feature Description" />
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <input placeholder="Name" className="border rounded p-1" />
          <input placeholder="Pronouns" className="border rounded p-1" />
          <select className="border rounded p-1">
            {OBOJIMA_ANCESTRIES.map(h => <option key={h}>{h}</option>)}
          </select>
          <select className="border rounded p-1">
            {OBOJIMA_SUBCLASSES.map(sc => <option key={sc}>{sc}</option>)}
          </select>
          <select
            className="border rounded p-1 col-span-2"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>Level {i + 1}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {ATTRIBUTES.map(attr => (
            <div key={attr} className="flex flex-col items-center">
              <span className="font-semibold text-sm text-center">{attr}</span>
              <select className="border rounded p-1 w-16 text-center">
                {[...new Set(getAttributeOptions())].map(v => <option key={v}>{v}</option>)}
              </select>
              <div className="text-xs text-center mt-1">
                {ATTRIBUTE_DESCRIPTIONS[attr].map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block font-bold">Proficiency</label>
          <FillableBubbles count={6} filledStart={proficiencyFilled} />
        </div>

        <div>
          <label className="block font-bold text-lg">Active Weapons</label>
          {['Primary', 'Secondary', 'Tertiary', 'Quaternary'].map((label, i) => (
            <div key={i}>
              <div className="font-semibold mt-2">{label}</div>
              <div className="grid grid-cols-3 gap-2">
                <input className="border rounded p-1" placeholder="Name" />
                <input className="border rounded p-1" placeholder="Trait & Range" />
                <input className="border rounded p-1" placeholder="Damage Dice & Type" />
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block font-bold text-lg">Active Armor</label>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <input className="border rounded p-1" placeholder="Name" />
            <input className="border rounded p-1" placeholder="Base Thresholds" />
            <input className="border rounded p-1" placeholder="Base Score" />
          </div>
          <input className="w-full border rounded p-1 mb-1" placeholder="Feature" />
        </div>

        <div>
          <label className="block font-bold">Inventory</label>
          {[...Array(5)].map((_, i) => (
            <input key={i} className="w-full border rounded p-1 mb-1" placeholder="" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;
