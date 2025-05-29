
import { Element } from '../data/elements';

export interface ReactionResult {
  result: string;
  description: string;
}

// Simulate chemical reactions between elements
export const simulateReaction = (element1: Element, element2: Element): ReactionResult => {
  const combo = `${element1.symbol}-${element2.symbol}`;
  const reversedCombo = `${element2.symbol}-${element1.symbol}`;
  
  // Massive collection of chemical reactions
  const reactions: Record<string, ReactionResult> = {
    // Hydrogen reactions
    "H-O": { result: "H₂O (Water)", description: "Hydrogen and oxygen combine explosively to form water molecules." },
    "H-Cl": { result: "HCl (Hydrochloric Acid)", description: "Hydrogen and chlorine form hydrogen chloride, a strong acid." },
    "H-N": { result: "NH₃ (Ammonia)", description: "Hydrogen and nitrogen form ammonia under high pressure and temperature." },
    "H-F": { result: "HF (Hydrofluoric Acid)", description: "Hydrogen and fluorine form hydrofluoric acid, extremely corrosive." },
    "H-Br": { result: "HBr (Hydrogen Bromide)", description: "Hydrogen and bromine form hydrogen bromide gas." },
    "H-I": { result: "HI (Hydrogen Iodide)", description: "Hydrogen and iodine form hydrogen iodide, used in organic synthesis." },
    "H-S": { result: "H₂S (Hydrogen Sulfide)", description: "Hydrogen and sulfur form toxic hydrogen sulfide with rotten egg smell." },
    "H-P": { result: "PH₃ (Phosphine)", description: "Hydrogen and phosphorus form phosphine, a toxic gas." },
    "H-C": { result: "CH₄ (Methane)", description: "Carbon and hydrogen form methane, the simplest hydrocarbon." },
    
    // Alkali metals with halogens
    "Li-Cl": { result: "LiCl (Lithium Chloride)", description: "Lithium and chlorine form lithium chloride salt." },
    "Li-F": { result: "LiF (Lithium Fluoride)", description: "Lithium and fluorine form lithium fluoride with high melting point." },
    "Li-Br": { result: "LiBr (Lithium Bromide)", description: "Lithium and bromine form lithium bromide crystals." },
    "Li-I": { result: "LiI (Lithium Iodide)", description: "Lithium and iodine form lithium iodide, used in batteries." },
    "Na-Cl": { result: "NaCl (Table Salt)", description: "Sodium and chlorine form common table salt with ionic bonds." },
    "Na-F": { result: "NaF (Sodium Fluoride)", description: "Sodium and fluorine form sodium fluoride, used in toothpaste." },
    "Na-Br": { result: "NaBr (Sodium Bromide)", description: "Sodium and bromine form sodium bromide, once used in medicine." },
    "Na-I": { result: "NaI (Sodium Iodide)", description: "Sodium and iodine form sodium iodide, used in medical imaging." },
    "K-Cl": { result: "KCl (Potassium Chloride)", description: "Potassium and chlorine form potassium chloride salt substitute." },
    "K-F": { result: "KF (Potassium Fluoride)", description: "Potassium and fluorine form potassium fluoride." },
    "K-Br": { result: "KBr (Potassium Bromide)", description: "Potassium and bromine form potassium bromide crystals." },
    "K-I": { result: "KI (Potassium Iodide)", description: "Potassium and iodine form potassium iodide, radiation protection." },
    "Rb-Cl": { result: "RbCl (Rubidium Chloride)", description: "Rubidium and chlorine form rubidium chloride." },
    "Cs-Cl": { result: "CsCl (Cesium Chloride)", description: "Cesium and chlorine form cesium chloride with unique crystal structure." },
    
    // Alkaline earth metals
    "Be-O": { result: "BeO (Beryllium Oxide)", description: "Beryllium and oxygen form beryllium oxide, very hard ceramic." },
    "Mg-O": { result: "MgO (Magnesium Oxide)", description: "Magnesium burns in oxygen to form bright white magnesium oxide." },
    "Mg-Cl": { result: "MgCl₂ (Magnesium Chloride)", description: "Magnesium and chlorine form magnesium chloride, used for de-icing." },
    "Mg-S": { result: "MgS (Magnesium Sulfide)", description: "Magnesium and sulfur form magnesium sulfide." },
    "Ca-O": { result: "CaO (Quicklime)", description: "Calcium burns in oxygen to form quicklime, used in cement." },
    "Ca-Cl": { result: "CaCl₂ (Calcium Chloride)", description: "Calcium and chlorine form calcium chloride desiccant." },
    "Ca-S": { result: "CaS (Calcium Sulfide)", description: "Calcium and sulfur form calcium sulfide." },
    "Ca-C": { result: "CaC₂ (Calcium Carbide)", description: "Calcium and carbon form calcium carbide, produces acetylene gas." },
    "Sr-O": { result: "SrO (Strontium Oxide)", description: "Strontium and oxygen form strontium oxide." },
    "Ba-O": { result: "BaO (Barium Oxide)", description: "Barium and oxygen form barium oxide." },
    "Ra-Cl": { result: "RaCl₂ (Radium Chloride)", description: "Radium and chlorine form radioactive radium chloride." },
    
    // Transition metals
    "Fe-O": { result: "Fe₂O₃ (Iron Oxide)", description: "Iron and oxygen form rust, iron oxide, through oxidation." },
    "Fe-S": { result: "FeS (Iron Sulfide)", description: "Iron and sulfur form iron sulfide, pyrite-like compound." },
    "Fe-C": { result: "Fe₃C (Iron Carbide)", description: "Iron and carbon form iron carbide, component of steel." },
    "Cu-O": { result: "CuO (Copper Oxide)", description: "Copper and oxygen form black copper oxide." },
    "Cu-S": { result: "CuS (Copper Sulfide)", description: "Copper and sulfur form copper sulfide ore." },
    "Cu-Cl": { result: "CuCl₂ (Copper Chloride)", description: "Copper and chlorine form blue-green copper chloride." },
    "Zn-O": { result: "ZnO (Zinc Oxide)", description: "Zinc and oxygen form white zinc oxide, used in sunscreen." },
    "Zn-S": { result: "ZnS (Zinc Sulfide)", description: "Zinc and sulfur form zinc sulfide, luminescent material." },
    "Zn-Cl": { result: "ZnCl₂ (Zinc Chloride)", description: "Zinc and chlorine form zinc chloride, used in batteries." },
    "Ag-O": { result: "Ag₂O (Silver Oxide)", description: "Silver and oxygen form silver oxide, used in batteries." },
    "Ag-S": { result: "Ag₂S (Silver Sulfide)", description: "Silver and sulfur form silver sulfide, causes tarnishing." },
    "Au-Cl": { result: "AuCl₃ (Gold Chloride)", description: "Gold and chlorine form gold chloride under special conditions." },
    "Ni-O": { result: "NiO (Nickel Oxide)", description: "Nickel and oxygen form green nickel oxide." },
    "Co-O": { result: "CoO (Cobalt Oxide)", description: "Cobalt and oxygen form cobalt oxide, blue pigment." },
    "Cr-O": { result: "Cr₂O₃ (Chromium Oxide)", description: "Chromium and oxygen form green chromium oxide." },
    "Mn-O": { result: "MnO₂ (Manganese Dioxide)", description: "Manganese and oxygen form manganese dioxide, used in batteries." },
    "Ti-O": { result: "TiO₂ (Titanium Dioxide)", description: "Titanium and oxygen form white titanium dioxide pigment." },
    "V-O": { result: "V₂O₅ (Vanadium Pentoxide)", description: "Vanadium and oxygen form vanadium pentoxide catalyst." },
    
    // Post-transition metals
    "Al-O": { result: "Al₂O₃ (Aluminum Oxide)", description: "Aluminum and oxygen form aluminum oxide, sapphire and ruby." },
    "Al-Cl": { result: "AlCl₃ (Aluminum Chloride)", description: "Aluminum and chlorine form aluminum chloride catalyst." },
    "Al-S": { result: "Al₂S₃ (Aluminum Sulfide)", description: "Aluminum and sulfur form aluminum sulfide." },
    "Ga-As": { result: "GaAs (Gallium Arsenide)", description: "Gallium and arsenic form semiconductor gallium arsenide." },
    "In-P": { result: "InP (Indium Phosphide)", description: "Indium and phosphorus form semiconductor indium phosphide." },
    "Sn-O": { result: "SnO₂ (Tin Oxide)", description: "Tin and oxygen form tin oxide, used in electronics." },
    "Pb-O": { result: "PbO (Lead Oxide)", description: "Lead and oxygen form lead oxide, used in glass and ceramics." },
    "Pb-S": { result: "PbS (Lead Sulfide)", description: "Lead and sulfur form lead sulfide, galena ore." },
    "Bi-O": { result: "Bi₂O₃ (Bismuth Oxide)", description: "Bismuth and oxygen form bismuth oxide." },
    
    // Metalloids
    "B-N": { result: "BN (Boron Nitride)", description: "Boron and nitrogen form super-hard boron nitride." },
    "B-O": { result: "B₂O₃ (Boron Oxide)", description: "Boron and oxygen form boron oxide glass." },
    "Si-O": { result: "SiO₂ (Silicon Dioxide)", description: "Silicon and oxygen form quartz, sand, and glass." },
    "Si-C": { result: "SiC (Silicon Carbide)", description: "Silicon and carbon form extremely hard silicon carbide." },
    "Ge-O": { result: "GeO₂ (Germanium Dioxide)", description: "Germanium and oxygen form germanium dioxide." },
    "As-O": { result: "As₂O₃ (Arsenic Trioxide)", description: "Arsenic and oxygen form toxic arsenic trioxide." },
    "Sb-O": { result: "Sb₂O₃ (Antimony Trioxide)", description: "Antimony and oxygen form antimony trioxide flame retardant." },
    "Te-O": { result: "TeO₂ (Tellurium Dioxide)", description: "Tellurium and oxygen form tellurium dioxide." },
    
    // Nonmetals
    "C-O": { result: "CO₂ (Carbon Dioxide)", description: "Carbon burns in oxygen to form carbon dioxide gas." },
    "C-N": { result: "CN (Cyanide)", description: "Carbon and nitrogen form deadly cyanide compounds." },
    "C-S": { result: "CS₂ (Carbon Disulfide)", description: "Carbon and sulfur form volatile carbon disulfide." },
    "N-O": { result: "NO₂ (Nitrogen Dioxide)", description: "Nitrogen and oxygen form brown nitrogen dioxide gas." },
    "P-O": { result: "P₂O₅ (Phosphorus Pentoxide)", description: "Phosphorus burns to form phosphorus pentoxide." },
    "P-Cl": { result: "PCl₃ (Phosphorus Trichloride)", description: "Phosphorus and chlorine form phosphorus trichloride." },
    "S-O": { result: "SO₂ (Sulfur Dioxide)", description: "Sulfur burns to form choking sulfur dioxide gas." },
    
    // Noble gases (rare reactions)
    "Xe-F": { result: "XeF₂ (Xenon Difluoride)", description: "Xenon and fluorine form xenon difluoride under extreme conditions." },
    "Xe-O": { result: "XeO₃ (Xenon Trioxide)", description: "Xenon and oxygen form explosive xenon trioxide." },
    "Kr-F": { result: "KrF₂ (Krypton Difluoride)", description: "Krypton and fluorine form unstable krypton difluoride." },
    "Rn-F": { result: "RnF₂ (Radon Difluoride)", description: "Radon and fluorine theoretically form radon difluoride." },
    
    // Lanthanides
    "La-O": { result: "La₂O₃ (Lanthanum Oxide)", description: "Lanthanum and oxygen form lanthanum oxide." },
    "Ce-O": { result: "CeO₂ (Cerium Oxide)", description: "Cerium and oxygen form cerium oxide, used in catalysts." },
    "Nd-Fe": { result: "Nd₂Fe₁₄B (Neodymium Magnet)", description: "Neodymium and iron form super-strong permanent magnets." },
    "Eu-O": { result: "Eu₂O₃ (Europium Oxide)", description: "Europium and oxygen form red phosphor europium oxide." },
    "Gd-O": { result: "Gd₂O₃ (Gadolinium Oxide)", description: "Gadolinium and oxygen form gadolinium oxide." },
    "Tb-O": { result: "Tb₂O₃ (Terbium Oxide)", description: "Terbium and oxygen form green phosphor terbium oxide." },
    "Dy-O": { result: "Dy₂O₃ (Dysprosium Oxide)", description: "Dysprosium and oxygen form dysprosium oxide." },
    "Ho-O": { result: "Ho₂O₃ (Holmium Oxide)", description: "Holmium and oxygen form holmium oxide." },
    "Er-O": { result: "Er₂O₃ (Erbium Oxide)", description: "Erbium and oxygen form pink erbium oxide." },
    "Tm-O": { result: "Tm₂O₃ (Thulium Oxide)", description: "Thulium and oxygen form thulium oxide." },
    "Yb-O": { result: "Yb₂O₃ (Ytterbium Oxide)", description: "Ytterbium and oxygen form ytterbium oxide." },
    "Lu-O": { result: "Lu₂O₃ (Lutetium Oxide)", description: "Lutetium and oxygen form rare lutetium oxide." },
    
    // Actinides
    "Ac-O": { result: "Ac₂O₃ (Actinium Oxide)", description: "Actinium and oxygen form radioactive actinium oxide." },
    "Th-O": { result: "ThO₂ (Thorium Oxide)", description: "Thorium and oxygen form thorium oxide, used in nuclear fuel." },
    "Pa-O": { result: "Pa₂O₅ (Protactinium Oxide)", description: "Protactinium and oxygen form protactinium oxide." },
    "U-O": { result: "UO₂ (Uranium Dioxide)", description: "Uranium and oxygen form uranium dioxide nuclear fuel." },
    "U-F": { result: "UF₆ (Uranium Hexafluoride)", description: "Uranium and fluorine form uranium hexafluoride for enrichment." },
    "Np-O": { result: "NpO₂ (Neptunium Dioxide)", description: "Neptunium and oxygen form neptunium dioxide." },
    "Pu-O": { result: "PuO₂ (Plutonium Dioxide)", description: "Plutonium and oxygen form plutonium dioxide." },
    "Am-O": { result: "Am₂O₃ (Americium Oxide)", description: "Americium and oxygen form americium oxide." },
    "Cm-O": { result: "Cm₂O₃ (Curium Oxide)", description: "Curium and oxygen form curium oxide." },
    
    // Complex reactions
    "Na-H2O": { result: "NaOH + H₂", description: "Sodium reacts violently with water producing sodium hydroxide and hydrogen gas." },
    "K-H2O": { result: "KOH + H₂", description: "Potassium explodes in water forming potassium hydroxide and hydrogen." },
    "Ca-H2O": { result: "Ca(OH)₂ + H₂", description: "Calcium reacts with water to form calcium hydroxide and hydrogen." },
    "CaO-H2O": { result: "Ca(OH)₂", description: "Quicklime reacts vigorously with water to form slaked lime." },
    
    // Acid-base reactions
    "HCl-NaOH": { result: "NaCl + H₂O", description: "Hydrochloric acid neutralizes sodium hydroxide forming salt and water." },
    "H2SO4-NaOH": { result: "Na₂SO₄ + H₂O", description: "Sulfuric acid neutralizes sodium hydroxide forming sodium sulfate." },
    "HNO3-NaOH": { result: "NaNO₃ + H₂O", description: "Nitric acid neutralizes sodium hydroxide forming sodium nitrate." },
    
    // Organic-like reactions
    "C-H": { result: "Various Hydrocarbons", description: "Carbon and hydrogen form countless hydrocarbon compounds." },
    "C-Cl": { result: "CCl₄ (Carbon Tetrachloride)", description: "Carbon and chlorine form carbon tetrachloride solvent." },
    
    // More halogen combinations
    "Cl-Br": { result: "BrCl (Bromine Chloride)", description: "Chlorine and bromine form interhalogen bromine chloride." },
    "Cl-I": { result: "ICl (Iodine Chloride)", description: "Chlorine and iodine form dark iodine chloride." },
    "Br-I": { result: "IBr (Iodine Bromide)", description: "Bromine and iodine form iodine bromide interhalogen." },
    "F-Cl": { result: "ClF (Chlorine Fluoride)", description: "Fluorine and chlorine form highly reactive chlorine fluoride." },
    "F-Br": { result: "BrF₃ (Bromine Trifluoride)", description: "Fluorine and bromine form bromine trifluoride." },
    "F-I": { result: "IF₅ (Iodine Pentafluoride)", description: "Fluorine and iodine form iodine pentafluoride." },
    
    // More complex compounds
    "Al-N": { result: "AlN (Aluminum Nitride)", description: "Aluminum and nitrogen form aluminum nitride semiconductor." },
    "Mg-N": { result: "Mg₃N₂ (Magnesium Nitride)", description: "Magnesium and nitrogen form magnesium nitride." },
    "Ca-N": { result: "Ca₃N₂ (Calcium Nitride)", description: "Calcium and nitrogen form calcium nitride." },
    "Li-N": { result: "Li₃N (Lithium Nitride)", description: "Lithium and nitrogen form lithium nitride." },
    
    // Phosphides
    "Ca-P": { result: "Ca₃P₂ (Calcium Phosphide)", description: "Calcium and phosphorus form calcium phosphide." },
    "Mg-P": { result: "Mg₃P₂ (Magnesium Phosphide)", description: "Magnesium and phosphorus form magnesium phosphide." },
    "Al-P": { result: "AlP (Aluminum Phosphide)", description: "Aluminum and phosphorus form aluminum phosphide pesticide." },
    
    // Carbides
    "Si-C": { result: "SiC (Silicon Carbide)", description: "Silicon and carbon form extremely hard silicon carbide abrasive." },
    "W-C": { result: "WC (Tungsten Carbide)", description: "Tungsten and carbon form ultra-hard tungsten carbide." },
    "Ti-C": { result: "TiC (Titanium Carbide)", description: "Titanium and carbon form hard titanium carbide." },
    "Cr-C": { result: "Cr₃C₂ (Chromium Carbide)", description: "Chromium and carbon form chromium carbide." },
    
    // Nitrides
    "Si-N": { result: "Si₃N₄ (Silicon Nitride)", description: "Silicon and nitrogen form strong silicon nitride ceramic." },
    "Ti-N": { result: "TiN (Titanium Nitride)", description: "Titanium and nitrogen form golden titanium nitride coating." },
    "Cr-N": { result: "CrN (Chromium Nitride)", description: "Chromium and nitrogen form hard chromium nitride." },
    "Fe-N": { result: "Fe₄N (Iron Nitride)", description: "Iron and nitrogen form iron nitride in steel." },
    
    // Sulfides of various metals
    "Ni-S": { result: "NiS (Nickel Sulfide)", description: "Nickel and sulfur form nickel sulfide ore." },
    "Co-S": { result: "CoS (Cobalt Sulfide)", description: "Cobalt and sulfur form cobalt sulfide." },
    "Mn-S": { result: "MnS (Manganese Sulfide)", description: "Manganese and sulfur form manganese sulfide." },
    "Cr-S": { result: "Cr₂S₃ (Chromium Sulfide)", description: "Chromium and sulfur form chromium sulfide." },
    "V-S": { result: "VS₂ (Vanadium Sulfide)", description: "Vanadium and sulfur form vanadium sulfide." },
    "Ti-S": { result: "TiS₂ (Titanium Sulfide)", description: "Titanium and sulfur form layered titanium sulfide." },
    "Mo-S": { result: "MoS₂ (Molybdenum Sulfide)", description: "Molybdenum and sulfur form molybdenum disulfide lubricant." },
    "W-S": { result: "WS₂ (Tungsten Sulfide)", description: "Tungsten and sulfur form tungsten disulfide." },
    
    // Rare earth combinations
    "Y-O": { result: "Y₂O₃ (Yttrium Oxide)", description: "Yttrium and oxygen form yttrium oxide phosphor." },
    "Sc-O": { result: "Sc₂O₃ (Scandium Oxide)", description: "Scandium and oxygen form rare scandium oxide." },
    
    // Modern semiconductor materials
    "Ga-N": { result: "GaN (Gallium Nitride)", description: "Gallium and nitrogen form blue LED material gallium nitride." },
    "In-N": { result: "InN (Indium Nitride)", description: "Indium and nitrogen form indium nitride semiconductor." },
    "Al-N": { result: "AlN (Aluminum Nitride)", description: "Aluminum and nitrogen form wide bandgap aluminum nitride." },
    "Ga-P": { result: "GaP (Gallium Phosphide)", description: "Gallium and phosphorus form red LED material gallium phosphide." },
    "In-As": { result: "InAs (Indium Arsenide)", description: "Indium and arsenic form infrared detector indium arsenide." },
    "Ga-Sb": { result: "GaSb (Gallium Antimonide)", description: "Gallium and antimony form gallium antimonide semiconductor." },
    
    // Heavy metal compounds
    "Hg-S": { result: "HgS (Mercury Sulfide)", description: "Mercury and sulfur form red cinnabar mercury sulfide." },
    "Hg-O": { result: "HgO (Mercury Oxide)", description: "Mercury and oxygen form toxic mercury oxide." },
    "Cd-S": { result: "CdS (Cadmium Sulfide)", description: "Cadmium and sulfur form yellow cadmium sulfide pigment." },
    "Cd-Se": { result: "CdSe (Cadmium Selenide)", description: "Cadmium and selenium form quantum dot cadmium selenide." },
    "Cd-Te": { result: "CdTe (Cadmium Telluride)", description: "Cadmium and tellurium form solar cell cadmium telluride." },
    
    // Platinum group metals
    "Pt-O": { result: "PtO₂ (Platinum Oxide)", description: "Platinum and oxygen form platinum oxide catalyst." },
    "Pd-O": { result: "PdO (Palladium Oxide)", description: "Palladium and oxygen form palladium oxide." },
    "Rh-O": { result: "Rh₂O₃ (Rhodium Oxide)", description: "Rhodium and oxygen form rhodium oxide." },
    "Ir-O": { result: "IrO₂ (Iridium Oxide)", description: "Iridium and oxygen form iridium oxide." },
    "Ru-O": { result: "RuO₂ (Ruthenium Oxide)", description: "Ruthenium and oxygen form ruthenium oxide." },
    "Os-O": { result: "OsO₄ (Osmium Tetroxide)", description: "Osmium and oxygen form toxic osmium tetroxide." }
  };
  
  if (reactions[combo]) {
    return reactions[combo];
  } else if (reactions[reversedCombo]) {
    return reactions[reversedCombo];
  } else {
    return {
      result: "No Known Reaction",
      description: `No documented reaction between ${element1.name} and ${element2.name} under normal conditions.`
    };
  }
};
