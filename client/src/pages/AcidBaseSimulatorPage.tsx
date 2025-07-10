import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Beaker, Trash2, Plus, ArrowRight, Droplets, TestTube, Search, Activity, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface AcidBase {
  id: string;
  name: string;
  formula: string;
  type: 'acid' | 'base';
  strength: 'strong' | 'weak';
  concentration: number;
  color: string;
}

interface Solution {
  acids: AcidBase[];
  bases: AcidBase[];
  ph: number;
  color: string;
  name: string;
}

// 100 Common Acids
const commonAcids: AcidBase[] = [
  // Strong Acids
  { id: 'hcl', name: 'Hydrochloric Acid', formula: 'HCl', type: 'acid', strength: 'strong', concentration: 1.0, color: 'rgb(255, 100, 100)' },
  { id: 'h2so4', name: 'Sulfuric Acid', formula: 'H₂SO₄', type: 'acid', strength: 'strong', concentration: 1.0, color: 'rgb(255, 50, 50)' },
  { id: 'hno3', name: 'Nitric Acid', formula: 'HNO₃', type: 'acid', strength: 'strong', concentration: 1.0, color: 'rgb(255, 150, 100)' },
  { id: 'hbr', name: 'Hydrobromic Acid', formula: 'HBr', type: 'acid', strength: 'strong', concentration: 1.0, color: 'rgb(255, 120, 80)' },
  { id: 'hi', name: 'Hydroiodic Acid', formula: 'HI', type: 'acid', strength: 'strong', concentration: 1.0, color: 'rgb(255, 140, 60)' },
  { id: 'hclo4', name: 'Perchloric Acid', formula: 'HClO₄', type: 'acid', strength: 'strong', concentration: 1.0, color: 'rgb(255, 80, 120)' },
  { id: 'hclo3', name: 'Chloric Acid', formula: 'HClO₃', type: 'acid', strength: 'strong', concentration: 1.0, color: 'rgb(255, 90, 110)' },
  
  // Weak Acids
  { id: 'ch3cooh', name: 'Acetic Acid', formula: 'CH₃COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 200, 150)' },
  { id: 'h2co3', name: 'Carbonic Acid', formula: 'H₂CO₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 210, 160)' },
  { id: 'h3po4', name: 'Phosphoric Acid', formula: 'H₃PO₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 190, 140)' },
  { id: 'hf', name: 'Hydrofluoric Acid', formula: 'HF', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 160, 120)' },
  { id: 'h2s', name: 'Hydrogen Sulfide', formula: 'H₂S', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 220, 180)' },
  { id: 'hcn', name: 'Hydrocyanic Acid', formula: 'HCN', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 180, 130)' },
  { id: 'hcooh', name: 'Formic Acid', formula: 'HCOOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 195, 145)' },
  { id: 'c6h5cooh', name: 'Benzoic Acid', formula: 'C₆H₅COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 205, 155)' },
  { id: 'h2so3', name: 'Sulfurous Acid', formula: 'H₂SO₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 185, 135)' },
  { id: 'h3bo3', name: 'Boric Acid', formula: 'H₃BO₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 215, 165)' },
  { id: 'hno2', name: 'Nitrous Acid', formula: 'HNO₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 175, 125)' },
  { id: 'h2c2o4', name: 'Oxalic Acid', formula: 'H₂C₂O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 225, 175)' },
  { id: 'c4h6o6', name: 'Tartaric Acid', formula: 'C₄H₆O₆', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 235, 185)' },
  { id: 'c6h8o7', name: 'Citric Acid', formula: 'C₆H₈O₇', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 245, 195)' },
  { id: 'c2h5cooh', name: 'Propionic Acid', formula: 'C₂H₅COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 200, 150)' },
  { id: 'c3h7cooh', name: 'Butyric Acid', formula: 'C₃H₇COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 210, 160)' },
  { id: 'c4h9cooh', name: 'Valeric Acid', formula: 'C₄H₉COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 220, 170)' },
  { id: 'c5h11cooh', name: 'Caproic Acid', formula: 'C₅H₁₁COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 230, 180)' },
  { id: 'c17h35cooh', name: 'Stearic Acid', formula: 'C₁₇H₃₅COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 240, 190)' },
  { id: 'c17h33cooh', name: 'Oleic Acid', formula: 'C₁₇H₃₃COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 250, 200)' },
  { id: 'c15h31cooh', name: 'Palmitic Acid', formula: 'C₁₅H₃₁COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 195, 145)' },
  { id: 'c11h23cooh', name: 'Lauric Acid', formula: 'C₁₁H₂₃COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 205, 155)' },
  { id: 'c9h19cooh', name: 'Capric Acid', formula: 'C₉H₁₉COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 215, 165)' },
  { id: 'c7h15cooh', name: 'Caprylic Acid', formula: 'C₇H₁₅COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 225, 175)' },
  { id: 'ch2clcooh', name: 'Chloroacetic Acid', formula: 'CH₂ClCOOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 180, 130)' },
  { id: 'chcl2cooh', name: 'Dichloroacetic Acid', formula: 'CHCl₂COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 170, 120)' },
  { id: 'ccl3cooh', name: 'Trichloroacetic Acid', formula: 'CCl₃COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 160, 110)' },
  { id: 'c6h4ohcooh', name: 'Salicylic Acid', formula: 'C₆H₄(OH)COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 235, 185)' },
  { id: 'c7h6o3', name: 'Salicylic Acid', formula: 'C₇H₆O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 245, 195)' },
  { id: 'c9h8o4', name: 'Acetylsalicylic Acid', formula: 'C₉H₈O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 190, 140)' },
  { id: 'c6h4cooh2', name: 'Phthalic Acid', formula: 'C₆H₄(COOH)₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 200, 150)' },
  { id: 'c8h6o4', name: 'Terephthalic Acid', formula: 'C₈H₆O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 210, 160)' },
  { id: 'c8h6o4_iso', name: 'Isophthalic Acid', formula: 'C₈H₆O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 220, 170)' },
  { id: 'c4h4o4', name: 'Succinic Acid', formula: 'C₄H₄O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 230, 180)' },
  { id: 'c4h6o4', name: 'Malic Acid', formula: 'C₄H₆O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 240, 190)' },
  { id: 'c5h8o4', name: 'Glutaric Acid', formula: 'C₅H₈O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 250, 200)' },
  { id: 'c6h10o4', name: 'Adipic Acid', formula: 'C₆H₁₀O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 195, 145)' },
  { id: 'c7h12o4', name: 'Pimelic Acid', formula: 'C₇H₁₂O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 205, 155)' },
  { id: 'c8h14o4', name: 'Suberic Acid', formula: 'C₈H₁₄O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 215, 165)' },
  { id: 'c9h16o4', name: 'Azelaic Acid', formula: 'C₉H₁₆O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 225, 175)' },
  { id: 'c10h18o4', name: 'Sebacic Acid', formula: 'C₁₀H₁₈O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 235, 185)' },
  { id: 'c3h6o3', name: 'Lactic Acid', formula: 'C₃H₆O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 245, 195)' },
  { id: 'c3h4o3', name: 'Pyruvic Acid', formula: 'C₃H₄O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 180, 130)' },
  { id: 'c4h8o3', name: 'Butyric Acid', formula: 'C₄H₈O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 190, 140)' },
  { id: 'c5h10o3', name: 'Valeric Acid', formula: 'C₅H₁₀O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 200, 150)' },
  { id: 'c6h12o3', name: 'Caproic Acid', formula: 'C₆H₁₂O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 210, 160)' },
  { id: 'h2c4h4o6', name: 'Tartaric Acid', formula: 'H₂C₄H₄O₆', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 220, 170)' },
  { id: 'c6h5oh', name: 'Phenol', formula: 'C₆H₅OH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 230, 180)' },
  { id: 'c7h8o', name: 'Cresol', formula: 'C₇H₈O', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 240, 190)' },
  { id: 'c8h10o', name: 'Xylenol', formula: 'C₈H₁₀O', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 250, 200)' },
  { id: 'c6h4oh2', name: 'Catechol', formula: 'C₆H₄(OH)₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 195, 145)' },
  { id: 'c6h4oh2_res', name: 'Resorcinol', formula: 'C₆H₄(OH)₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 205, 155)' },
  { id: 'c6h4oh2_hyd', name: 'Hydroquinone', formula: 'C₆H₄(OH)₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 215, 165)' },
  { id: 'c6h3oh3', name: 'Pyrogallol', formula: 'C₆H₃(OH)₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 225, 175)' },
  { id: 'c6h6o3', name: 'Phloroglucinol', formula: 'C₆H₆O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 235, 185)' },
  { id: 'c7h8o2', name: 'Guaiacol', formula: 'C₇H₈O₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 245, 195)' },
  { id: 'c9h10o2', name: 'Eugenol', formula: 'C₉H₁₀O₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 180, 130)' },
  { id: 'c8h8o2', name: 'Vanillin', formula: 'C₈H₈O₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 190, 140)' },
  { id: 'c10h12o2', name: 'Safrol', formula: 'C₁₀H₁₂O₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 200, 150)' },
  { id: 'c9h8o3', name: 'Caffeic Acid', formula: 'C₉H₈O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 210, 160)' },
  { id: 'c9h8o4_ferulic', name: 'Ferulic Acid', formula: 'C₉H₈O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 220, 170)' },
  { id: 'c8h8o3', name: 'Vanillic Acid', formula: 'C₈H₈O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 230, 180)' },
  { id: 'c7h6o4', name: 'Gallic Acid', formula: 'C₇H₆O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 240, 190)' },
  { id: 'c7h6o3_proto', name: 'Protocatechuic Acid', formula: 'C₇H₆O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 250, 200)' },
  { id: 'c7h6o2', name: 'p-Hydroxybenzoic Acid', formula: 'C₇H₆O₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 195, 145)' },
  { id: 'c8h8o2_methoxy', name: 'Anisic Acid', formula: 'C₈H₈O₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 205, 155)' },
  { id: 'c8h8o3_syringic', name: 'Syringic Acid', formula: 'C₈H₈O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 215, 165)' },
  { id: 'c9h10o3', name: 'Homovanillic Acid', formula: 'C₉H₁₀O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 225, 175)' },
  { id: 'c9h10o4', name: 'Homoveratric Acid', formula: 'C₉H₁₀O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 235, 185)' },
  { id: 'c10h12o4', name: 'Rosmarinic Acid', formula: 'C₁₀H₁₂O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 245, 195)' },
  { id: 'c9h8o2_cinn', name: 'Cinnamic Acid', formula: 'C₉H₈O₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 180, 130)' },
  { id: 'c9h8o3_coum', name: 'Coumaric Acid', formula: 'C₉H₈O₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 190, 140)' },
  { id: 'c15h10o5', name: 'Quercetin', formula: 'C₁₅H₁₀O₅', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 200, 150)' },
  { id: 'c15h10o6', name: 'Kaempferol', formula: 'C₁₅H₁₀O₆', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 210, 160)' },
  { id: 'c15h10o7', name: 'Myricetin', formula: 'C₁₅H₁₀O₇', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 220, 170)' },
  { id: 'c21h20o12', name: 'Rutin', formula: 'C₂₁H₂₀O₁₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 230, 180)' },
  { id: 'c27h30o16', name: 'Hesperidin', formula: 'C₂₇H₃₀O₁₆', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 240, 190)' },
  { id: 'c15h10o4', name: 'Apigenin', formula: 'C₁₅H₁₀O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 250, 200)' },
  { id: 'c16h12o4', name: 'Luteolin', formula: 'C₁₆H₁₂O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 195, 145)' },
  { id: 'c15h12o5', name: 'Naringenin', formula: 'C₁₅H₁₂O₅', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 205, 155)' },
  { id: 'c16h14o6', name: 'Hesperetin', formula: 'C₁₆H₁₄O₆', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 215, 165)' },
  { id: 'c15h12o6', name: 'Eriodictyol', formula: 'C₁₅H₁₂O₆', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 225, 175)' },
  { id: 'c15h12o7', name: 'Dihydroquercetin', formula: 'C₁₅H₁₂O₇', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 235, 185)' },
  { id: 'c20h18o11', name: 'Epicatechin', formula: 'C₂₀H₁₈O₁₁', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 245, 195)' },
  { id: 'c15h14o6', name: 'Catechin', formula: 'C₁₅H₁₄O₆', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 180, 130)' },
  { id: 'c30h26o13', name: 'Procyanidin B2', formula: 'C₃₀H₂₆O₁₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 190, 140)' },
  { id: 'c45h38o18', name: 'Procyanidin C1', formula: 'C₄₅H₃₈O₁₈', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 200, 150)' },
  { id: 'c14h6o8', name: 'Ellagic Acid', formula: 'C₁₄H₆O₈', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 210, 160)' },
  { id: 'c7h4o4', name: 'Chebulic Acid', formula: 'C₇H₄O₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 220, 170)' },
  { id: 'c41h68o14', name: 'Tannic Acid', formula: 'C₄₁H₆₈O₁₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 230, 180)' },
  { id: 'c76h52o46', name: 'Pentagalloylglucose', formula: 'C₇₆H₅₂O₄₆', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 240, 190)' },
  { id: 'c6h14n4o2', name: 'Arginine', formula: 'C₆H₁₄N₄O₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 250, 200)' },
  { id: 'c6h13no2', name: 'Leucine', formula: 'C₆H₁₃NO₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 195, 145)' },
  { id: 'c5h11no2', name: 'Valine', formula: 'C₅H₁₁NO₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 205, 155)' },
  { id: 'c4h9no2', name: 'Threonine', formula: 'C₄H₉NO₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 215, 165)' },
  { id: 'c3h7no2', name: 'Serine', formula: 'C₃H₇NO₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 225, 175)' },
  { id: 'c2h5no2', name: 'Glycine', formula: 'C₂H₅NO₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 235, 185)' },
  { id: 'c3h7no2s', name: 'Cysteine', formula: 'C₃H₇NO₂S', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 245, 195)' },
  { id: 'c5h9no4', name: 'Glutamic Acid', formula: 'C₅H₉NO₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 180, 130)' },
  { id: 'c4h7no4', name: 'Aspartic Acid', formula: 'C₄H₇NO₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 190, 140)' },
  { id: 'c9h11no2', name: 'Phenylalanine', formula: 'C₉H₁₁NO₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 200, 150)' },
  { id: 'c9h11no3', name: 'Tyrosine', formula: 'C₉H₁₁NO₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 210, 160)' },
  { id: 'c11h12n2o2', name: 'Tryptophan', formula: 'C₁₁H₁₂N₂O₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 220, 170)' },
  { id: 'c6h14n2o2', name: 'Lysine', formula: 'C₆H₁₄N₂O₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 230, 180)' },
  { id: 'c6h9n3o2', name: 'Histidine', formula: 'C₆H₉N₃O₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 240, 190)' },
  { id: 'c5h9no2', name: 'Proline', formula: 'C₅H₉NO₂', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 250, 200)' },
  { id: 'c6h13no2s', name: 'Methionine', formula: 'C₆H₁₃NO₂S', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 195, 145)' },
  { id: 'c4h9no3', name: 'Homoserine', formula: 'C₄H₉NO₃', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 205, 155)' },
  { id: 'c6h13no4', name: 'Hydroxyproline', formula: 'C₆H₁₃NO₄', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 215, 165)' },
];

// 100 Common Bases
const commonBases: AcidBase[] = [
  // Strong Bases
  { id: 'naoh', name: 'Sodium Hydroxide', formula: 'NaOH', type: 'base', strength: 'strong', concentration: 1.0, color: 'rgb(100, 100, 255)' },
  { id: 'koh', name: 'Potassium Hydroxide', formula: 'KOH', type: 'base', strength: 'strong', concentration: 1.0, color: 'rgb(120, 120, 255)' },
  { id: 'lioh', name: 'Lithium Hydroxide', formula: 'LiOH', type: 'base', strength: 'strong', concentration: 1.0, color: 'rgb(140, 140, 255)' },
  { id: 'rboh', name: 'Rubidium Hydroxide', formula: 'RbOH', type: 'base', strength: 'strong', concentration: 1.0, color: 'rgb(160, 160, 255)' },
  { id: 'csoh', name: 'Cesium Hydroxide', formula: 'CsOH', type: 'base', strength: 'strong', concentration: 1.0, color: 'rgb(180, 180, 255)' },
  { id: 'caoh2', name: 'Calcium Hydroxide', formula: 'Ca(OH)₂', type: 'base', strength: 'strong', concentration: 1.0, color: 'rgb(200, 200, 255)' },
  { id: 'sroh2', name: 'Strontium Hydroxide', formula: 'Sr(OH)₂', type: 'base', strength: 'strong', concentration: 1.0, color: 'rgb(220, 220, 255)' },
  { id: 'baoh2', name: 'Barium Hydroxide', formula: 'Ba(OH)₂', type: 'base', strength: 'strong', concentration: 1.0, color: 'rgb(110, 110, 255)' },
  
  // Weak Bases
  { id: 'nh3', name: 'Ammonia', formula: 'NH₃', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'ch3nh2', name: 'Methylamine', formula: 'CH₃NH₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c2h5nh2', name: 'Ethylamine', formula: 'C₂H₅NH₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c3h7nh2', name: 'Propylamine', formula: 'C₃H₇NH₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c4h9nh2', name: 'Butylamine', formula: 'C₄H₉NH₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'ch32nh', name: 'Dimethylamine', formula: '(CH₃)₂NH', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c2h52nh', name: 'Diethylamine', formula: '(C₂H₅)₂NH', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'ch33n', name: 'Trimethylamine', formula: '(CH₃)₃N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c2h53n', name: 'Triethylamine', formula: '(C₂H₅)₃N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'c5h5n', name: 'Pyridine', formula: 'C₅H₅N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c6h7n', name: 'Aniline', formula: 'C₆H₇N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c7h9n', name: 'Benzylamine', formula: 'C₇H₉N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c8h11n', name: 'Phenethylamine', formula: 'C₈H₁₁N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'c4h4n2', name: 'Pyrazine', formula: 'C₄H₄N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c4h4n2_pyr', name: 'Pyrimidine', formula: 'C₄H₄N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'c4h4n2_pyd', name: 'Pyridazine', formula: 'C₄H₄N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c4h5n3', name: 'Imidazole', formula: 'C₄H₅N₃', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'c3h4n2', name: 'Pyrazole', formula: 'C₃H₄N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c4h4o', name: 'Furan', formula: 'C₄H₄O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c4h4s', name: 'Thiophene', formula: 'C₄H₄S', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c4h5n', name: 'Pyrrole', formula: 'C₄H₅N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'c8h6n4', name: 'Quinoxaline', formula: 'C₈H₆N₄', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c8h7n', name: 'Quinoline', formula: 'C₈H₇N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'c8h7n_iso', name: 'Isoquinoline', formula: 'C₈H₇N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c9h7n', name: 'Carbazole', formula: 'C₉H₇N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'c13h9n', name: 'Acridine', formula: 'C₁₃H₉N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c14h10n2', name: 'Phenazine', formula: 'C₁₄H₁₀N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c12h8n2', name: 'Phenanthroline', formula: 'C₁₂H₈N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c10h8n2', name: 'Bipyridine', formula: 'C₁₀H₈N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'c6h16n2', name: 'Hexamethylenediamine', formula: 'C₆H₁₆N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c5h14n2', name: 'Pentamethylenediamine', formula: 'C₅H₁₄N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'c4h12n2', name: 'Putrescine', formula: 'C₄H₁₂N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c5h14n2_cad', name: 'Cadaverine', formula: 'C₅H₁₄N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'c8h11n', name: 'Tyramine', formula: 'C₈H₁₁N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c8h11no', name: 'Dopamine', formula: 'C₈H₁₁NO', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c9h13n', name: 'Ephedrine', formula: 'C₉H₁₃N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c9h13no', name: 'Norephedrine', formula: 'C₉H₁₃NO', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'c9h13no2', name: 'Adrenaline', formula: 'C₉H₁₃NO₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c8h11no2', name: 'Noradrenaline', formula: 'C₈H₁₁NO₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'c5h9no2', name: 'Betaine', formula: 'C₅H₉NO₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c5h14no', name: 'Choline', formula: 'C₅H₁₄NO', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'c7h17no2', name: 'Acetylcholine', formula: 'C₇H₁₇NO₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c10h12n2o', name: 'Serotonin', formula: 'C₁₀H₁₂N₂O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c11h15n2o2', name: 'Melatonin', formula: 'C₁₁H₁₅N₂O₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c6h6n2o', name: 'Nicotinamide', formula: 'C₆H₆N₂O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'c6h5no2', name: 'Niacin', formula: 'C₆H₅NO₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c8h9no2', name: 'Tryptamine', formula: 'C₈H₉NO₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'c12h16n2', name: 'Dimethyltryptamine', formula: 'C₁₂H₁₆N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c25h35no4', name: 'Psilocybin', formula: 'C₂₅H₃₅NO₄', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'c12h17no2', name: 'Mescaline', formula: 'C₁₂H₁₇NO₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c20h25n3o', name: 'Lysergic Acid', formula: 'C₂₀H₂₅N₃O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c17h19no3', name: 'Morphine', formula: 'C₁₇H₁₉NO₃', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c21h23no5', name: 'Heroin', formula: 'C₂₁H₂₃NO₅', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'c18h21no3', name: 'Codeine', formula: 'C₁₈H₂₁NO₃', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c16h21no2', name: 'Oxycodone', formula: 'C₁₆H₂₁NO₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'c18h23no3', name: 'Hydrocodone', formula: 'C₁₈H₂₃NO₃', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c17h21no4', name: 'Thebaine', formula: 'C₁₇H₂₁NO₄', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'c17h19no3_pap', name: 'Papaverine', formula: 'C₁₇H₁₉NO₃', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c20h21no4', name: 'Noscapine', formula: 'C₂₀H₂₁NO₄', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c17h19no3_nar', name: 'Narceine', formula: 'C₁₇H₁₉NO₃', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c17h21no', name: 'Cocaine', formula: 'C₁₇H₂₁NO', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'c9h13n', name: 'Amphetamine', formula: 'C₉H₁₃N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c10h15n', name: 'Methamphetamine', formula: 'C₁₀H₁₅N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'c11h15no2', name: 'MDMA', formula: 'C₁₁H₁₅NO₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c10h13no2', name: 'MDA', formula: 'C₁₀H₁₃NO₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'c12h17no2', name: 'MDEA', formula: 'C₁₂H₁₇NO₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c10h13no', name: 'Cathinone', formula: 'C₁₀H₁₃NO', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c11h15no', name: 'Methcathinone', formula: 'C₁₁H₁₅NO', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c12h17no', name: 'Bupropion', formula: 'C₁₂H₁₇NO', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'c17h19no', name: 'Phencyclidine', formula: 'C₁₇H₁₉NO', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c13h16cln', name: 'Ketamine', formula: 'C₁₃H₁₆ClN', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'c16h13cln2o', name: 'Diazepam', formula: 'C₁₆H₁₃ClN₂O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c15h10cln3o', name: 'Clonazepam', formula: 'C₁₅H₁₀ClN₃O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'c17h13cln4', name: 'Alprazolam', formula: 'C₁₇H₁₃ClN₄', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c15h10brn3o', name: 'Bromazepam', formula: 'C₁₅H₁₀BrN₃O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c16h12cln3o', name: 'Lorazepam', formula: 'C₁₆H₁₂ClN₃O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c15h11cln2o2', name: 'Oxazepam', formula: 'C₁₅H₁₁ClN₂O₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'c16h13fn2o', name: 'Flurazepam', formula: 'C₁₆H₁₃FN₂O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c17h18cln3o', name: 'Chlordiazepoxide', formula: 'C₁₇H₁₈ClN₃O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'c19h17cln2o', name: 'Temazepam', formula: 'C₁₉H₁₇ClN₂O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c18h13cln2o', name: 'Triazolam', formula: 'C₁₈H₁₃ClN₂O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'c22h19fn2o', name: 'Haloperidol', formula: 'C₂₂H₁₉FN₂O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c21h23no4', name: 'Risperidone', formula: 'C₂₁H₂₃NO₄', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c23h29no4', name: 'Quetiapine', formula: 'C₂₃H₂₉NO₄', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c18h19n3os', name: 'Olanzapine', formula: 'C₁₈H₁₉N₃OS', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'c23h27cl2n3o2', name: 'Aripiprazole', formula: 'C₂₃H₂₇Cl₂N₃O₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c21h25n3o2', name: 'Ziprasidone', formula: 'C₂₁H₂₅N₃O₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'c17h20n2s', name: 'Chlorpromazine', formula: 'C₁₇H₂₀N₂S', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c22h27n3o2s', name: 'Fluphenazine', formula: 'C₂₂H₂₇N₃O₂S', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'c21h23f3n2s', name: 'Trifluoperazine', formula: 'C₂₁H₂₃F₃N₂S', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c20h24n2o2', name: 'Fluoxetine', formula: 'C₂₀H₂₄N₂O₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c20h21n', name: 'Sertraline', formula: 'C₂₀H₂₁N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c20h21f3n2o', name: 'Paroxetine', formula: 'C₂₀H₂₁F₃N₂O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'c16h15n3o2', name: 'Escitalopram', formula: 'C₁₆H₁₅N₃O₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c20h23n', name: 'Citalopram', formula: 'C₂₀H₂₃N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'c17h18n2', name: 'Venlafaxine', formula: 'C₁₇H₁₈N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c21h26n2o', name: 'Duloxetine', formula: 'C₂₁H₂₆N₂O', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
  { id: 'c18h19n3', name: 'Mirtazapine', formula: 'C₁₈H₁₉N₃', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(160, 210, 255)' },
  { id: 'c19h20n2', name: 'Trazodone', formula: 'C₁₉H₂₀N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(170, 220, 255)' },
  { id: 'c20h23n', name: 'Nortriptyline', formula: 'C₂₀H₂₃N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(180, 230, 255)' },
  { id: 'c20h23n', name: 'Amitriptyline', formula: 'C₂₀H₂₃N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(190, 240, 255)' },
  { id: 'c19h23n', name: 'Doxepin', formula: 'C₁₉H₂₃N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 250, 255)' },
  { id: 'c19h23n', name: 'Imipramine', formula: 'C₁₉H₂₃N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(130, 180, 255)' },
  { id: 'c18h22n2', name: 'Clomipramine', formula: 'C₁₈H₂₂N₂', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(140, 190, 255)' },
  { id: 'c16h21n', name: 'Desipramine', formula: 'C₁₆H₂₁N', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(150, 200, 255)' },
];

const AcidBaseSimulatorPage = () => {
  const [currentSolution, setCurrentSolution] = useState<Solution>({
    acids: [],
    bases: [],
    ph: 7,
    color: 'rgb(200, 200, 200)',
    name: ''
  });
  const [solutionName, setSolutionName] = useState('');
  const [savedSolutions, setSavedSolutions] = useState<Solution[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter acids and bases based on search term
  const filteredAcids = commonAcids.filter(acid => 
    acid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acid.formula.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredBases = commonBases.filter(base => 
    base.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    base.formula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculatePH = useCallback((acids: AcidBase[], bases: AcidBase[]) => {
    if (acids.length === 0 && bases.length === 0) return 7;
    
    let totalAcidity = 0;
    let totalBasicity = 0;
    
    acids.forEach(acid => {
      const strength = acid.strength === 'strong' ? 1 : 0.1;
      totalAcidity += acid.concentration * strength;
    });
    
    bases.forEach(base => {
      const strength = base.strength === 'strong' ? 1 : 0.1;
      totalBasicity += base.concentration * strength;
    });
    
    const netAcidity = totalAcidity - totalBasicity;
    
    if (netAcidity > 0) {
      return Math.max(0, 7 - Math.log10(netAcidity * 10));
    } else if (netAcidity < 0) {
      return Math.min(14, 7 + Math.log10(Math.abs(netAcidity) * 10));
    }
    
    return 7;
  }, []);

  const getSolutionColor = useCallback((ph: number, acids: AcidBase[], bases: AcidBase[]) => {
    if (acids.length === 0 && bases.length === 0) {
      return 'rgb(200, 200, 200)';
    }
    
    if (ph < 3) return 'rgb(255, 100, 100)'; // Strong acid - red
    if (ph < 6) return 'rgb(255, 180, 120)'; // Weak acid - orange
    if (ph < 8) return 'rgb(220, 220, 220)'; // Neutral - gray
    if (ph < 11) return 'rgb(150, 200, 255)'; // Weak base - light blue
    return 'rgb(100, 150, 255)'; // Strong base - blue
  }, []);

  const addAcid = useCallback((acid: AcidBase) => {
    const newAcids = [...currentSolution.acids, acid];
    const ph = calculatePH(newAcids, currentSolution.bases);
    const color = getSolutionColor(ph, newAcids, currentSolution.bases);
    
    setCurrentSolution(prev => ({
      ...prev,
      acids: newAcids,
      ph,
      color
    }));
    
    toast(`Added ${acid.name} (pH ≈ ${ph.toFixed(1)})`, {
      style: { backgroundColor: acid.color, color: 'white' }
    });
  }, [currentSolution, calculatePH, getSolutionColor]);

  const addBase = useCallback((base: AcidBase) => {
    const newBases = [...currentSolution.bases, base];
    const ph = calculatePH(currentSolution.acids, newBases);
    const color = getSolutionColor(ph, currentSolution.acids, newBases);
    
    setCurrentSolution(prev => ({
      ...prev,
      bases: newBases,
      ph,
      color
    }));
    
    toast(`Added ${base.name} (pH ≈ ${ph.toFixed(1)})`, {
      style: { backgroundColor: base.color, color: 'white' }
    });
  }, [currentSolution, calculatePH, getSolutionColor]);

  const saveSolution = useCallback(() => {
    if (!solutionName.trim() || (currentSolution.acids.length === 0 && currentSolution.bases.length === 0)) {
      toast.error('Please enter a solution name and add at least one acid or base');
      return;
    }

    const solution: Solution = {
      name: solutionName.trim(),
      acids: [...currentSolution.acids],
      bases: [...currentSolution.bases],
      ph: currentSolution.ph,
      color: currentSolution.color
    };

    setSavedSolutions(prev => [...prev, solution]);
    setSolutionName('');
    toast.success(`Saved solution: ${solution.name}`);
  }, [solutionName, currentSolution]);

  const loadSolution = useCallback((solution: Solution) => {
    setCurrentSolution({...solution});
    setSolutionName(solution.name);
    toast(`Loaded ${solution.name}`);
  }, []);

  const clearSolution = useCallback(() => {
    setCurrentSolution({
      acids: [],
      bases: [],
      ph: 7,
      color: 'rgb(200, 200, 200)',
      name: ''
    });
    setSolutionName('');
    toast('Solution cleared');
  }, []);



  const getPHColor = (ph: number) => {
    if (ph < 3) return 'text-red-500';
    if (ph < 6) return 'text-orange-500';
    if (ph < 8) return 'text-gray-500';
    if (ph < 11) return 'text-blue-400';
    return 'text-blue-600';
  };

  const getPHLabel = (ph: number) => {
    if (ph < 3) return 'Strongly Acidic';
    if (ph < 6) return 'Weakly Acidic';
    if (ph < 8) return 'Neutral';
    if (ph < 11) return 'Weakly Basic';
    return 'Strongly Basic';
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-red-400 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
          Acid-Base Reaction Simulator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Mix acids and bases to create solutions and observe pH changes in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solution Builder */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="w-5 h-5" />
                Solution Builder
              </CardTitle>
              <CardDescription>
                Build your acid-base solution and observe pH changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Solution name..."
                    value={solutionName}
                    onChange={(e) => setSolutionName(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={saveSolution} disabled={currentSolution.acids.length === 0 && currentSolution.bases.length === 0}>
                    Save
                  </Button>
                  <Button variant="outline" onClick={clearSolution}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Solution Display */}
                <div className="p-6 bg-gradient-to-r from-red-50 via-yellow-50 to-blue-50 dark:from-red-900/20 dark:via-yellow-900/20 dark:to-blue-900/20 rounded-xl border">
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold mb-2">
                      pH = {currentSolution.ph.toFixed(2)}
                    </div>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <Badge variant="default" className={getPHColor(currentSolution.ph)}>
                        {getPHLabel(currentSolution.ph)}
                      </Badge>
                      <span className="text-muted-foreground">
                        {currentSolution.acids.length} Acids + {currentSolution.bases.length} Bases
                      </span>
                    </div>
                  </div>
                </div>

                {/* Acids and Bases Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      Added Acids
                    </h4>
                    {currentSolution.acids.length === 0 ? (
                      <div className="p-4 border-2 border-dashed border-red-200 rounded-lg text-center text-muted-foreground">
                        No acids added
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {currentSolution.acids.map((acid, index) => (
                          <div key={`${acid.id}-${index}`} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">{acid.formula}</Badge>
                              <span className="font-medium">{acid.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={acid.strength === 'strong' ? 'destructive' : 'secondary'} className="text-xs">
                                {acid.strength}
                              </Badge>
                              <Button size="sm" variant="destructive" onClick={() => {
                                const newAcids = currentSolution.acids.filter((_, i) => i !== index);
                                const ph = calculatePH(newAcids, currentSolution.bases);
                                const color = getSolutionColor(ph, newAcids, currentSolution.bases);
                                setCurrentSolution(prev => ({ ...prev, acids: newAcids, ph, color }));
                              }}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      Added Bases
                    </h4>
                    {currentSolution.bases.length === 0 ? (
                      <div className="p-4 border-2 border-dashed border-blue-200 rounded-lg text-center text-muted-foreground">
                        No bases added
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {currentSolution.bases.map((base, index) => (
                          <div key={`${base.id}-${index}`} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">{base.formula}</Badge>
                              <span className="font-medium">{base.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={base.strength === 'strong' ? 'default' : 'secondary'} className="text-xs bg-blue-500">
                                {base.strength}
                              </Badge>
                              <Button size="sm" variant="destructive" onClick={() => {
                                const newBases = currentSolution.bases.filter((_, i) => i !== index);
                                const ph = calculatePH(currentSolution.acids, newBases);
                                const color = getSolutionColor(ph, currentSolution.acids, newBases);
                                setCurrentSolution(prev => ({ ...prev, bases: newBases, ph, color }));
                              }}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chemical Palette */}
          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                Chemical Palette
              </CardTitle>
              <CardDescription>
                Search and select acids and bases to add to your solution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search acids and bases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h5 className="font-medium text-red-600 dark:text-red-400">Acids</h5>
                    <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                      {(searchTerm ? filteredAcids : commonAcids.slice(0, 24)).map((acid) => (
                        <Button
                          key={acid.id}
                          variant="outline"
                          size="sm"
                          onClick={() => addAcid(acid)}
                          className="liquid-glass-button p-2 h-auto flex flex-col items-center gap-1 hover:scale-105 transition-transform text-xs"
                          style={{
                            borderLeft: `3px solid ${acid.color}`,
                          }}
                        >
                          <span className="font-bold">{acid.formula}</span>
                          <span className="text-[0.6rem] opacity-70 text-center">{acid.name.split(' ')[0]}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h5 className="font-medium text-blue-600 dark:text-blue-400">Bases</h5>
                    <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                      {(searchTerm ? filteredBases : commonBases.slice(0, 24)).map((base) => (
                        <Button
                          key={base.id}
                          variant="outline"
                          size="sm"
                          onClick={() => addBase(base)}
                          className="liquid-glass-button p-2 h-auto flex flex-col items-center gap-1 hover:scale-105 transition-transform text-xs"
                          style={{
                            borderLeft: `3px solid ${base.color}`,
                          }}
                        >
                          <span className="font-bold">{base.formula}</span>
                          <span className="text-[0.6rem] opacity-70 text-center">{base.name.split(' ')[0]}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground text-center">
                  Click chemicals to add to solution
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with Beaker and Stats */}
        <div className="space-y-6">
          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="w-5 h-5" />
                Solution Beaker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enhanced Beaker Visualization - Same as Reaction Lab */}
              <div className="relative mx-auto w-64 h-80">
                {/* Beaker Container with Enhanced Styling */}
                <div className="absolute inset-0 border-4 border-gray-400 dark:border-gray-500 rounded-b-full rounded-t-lg bg-gradient-to-b from-transparent to-gray-50/20 dark:to-gray-800/20 shadow-lg">
                  
                  {/* Main Solution */}
                  <div 
                    className="absolute bottom-1 left-1 right-1 rounded-b-full transition-all duration-1000 ease-out overflow-hidden"
                    style={{
                      height: `${Math.min(85, (currentSolution.acids.length + currentSolution.bases.length) * 15 + 25)}%`,
                      backgroundColor: currentSolution.color,
                      opacity: 0.85,
                      animation: currentSolution.acids.length > 0 || currentSolution.bases.length > 0 ? 'gentle-bubble 3s infinite, chemical-reaction 2s ease-in-out infinite' : 'none',
                      boxShadow: currentSolution.acids.length > 0 || currentSolution.bases.length > 0 ? 'inset 0 0 20px rgba(255,255,255,0.3)' : 'none'
                    }}
                  >
                    {/* Bubbles Animation */}
                    {(currentSolution.acids.length > 0 || currentSolution.bases.length > 0) && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={`bubble-${i}`}
                            className="absolute bg-white/30 rounded-full animate-[gas-formation_4s_ease-out_infinite]"
                            style={{
                              width: Math.random() * 8 + 4 + 'px',
                              height: Math.random() * 8 + 4 + 'px',
                              left: Math.random() * 80 + 10 + '%',
                              bottom: Math.random() * 20 + '%',
                              animationDelay: Math.random() * 3 + 's'
                            }}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Swirling Effect for Mixing */}
                    {currentSolution.acids.length > 0 && currentSolution.bases.length > 0 && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={`swirl-${i}`}
                            className="absolute bg-white/20 rounded-full animate-[solution-mix_3s_linear_infinite]"
                            style={{
                              width: Math.random() * 6 + 3 + 'px',
                              height: Math.random() * 6 + 3 + 'px',
                              left: Math.random() * 70 + 15 + '%',
                              top: Math.random() * 70 + 15 + '%',
                              animationDelay: i * 0.5 + 's'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Surface Effect */}
                  {(currentSolution.acids.length > 0 || currentSolution.bases.length > 0) && (
                    <div 
                      className="absolute left-1 right-1 h-3 bg-gradient-to-b from-white/40 to-transparent rounded-full animate-[gentle-bubble_2s_ease-in-out_infinite]"
                      style={{
                        bottom: `${Math.min(85, (currentSolution.acids.length + currentSolution.bases.length) * 15 + 23)}%`
                      }}
                    />
                  )}
                  
                  {/* Volume Measurement Marks */}
                  <div className="absolute left-2 top-6 text-xs text-muted-foreground font-mono">250ml</div>
                  <div className="absolute left-2 top-1/3 text-xs text-muted-foreground font-mono">150ml</div>
                  <div className="absolute left-2 top-1/2 text-xs text-muted-foreground font-mono">100ml</div>
                  <div className="absolute left-2 bottom-1/4 text-xs text-muted-foreground font-mono">50ml</div>
                  
                  {/* Beaker Spout */}
                  <div className="absolute -right-3 top-8 w-6 h-4 border-t-2 border-r-2 border-gray-400 dark:border-gray-500 rounded-tr-lg"></div>
                  
                  {/* Glass Reflection Effect */}
                  <div className="absolute top-4 left-4 w-8 h-16 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-sm"></div>
                </div>

                {/* Heat/Steam Effect for Strong Reactions */}
                {currentSolution.acids.length > 0 && currentSolution.bases.length > 0 && 
                 currentSolution.acids.some(a => a.strength === 'strong') && 
                 currentSolution.bases.some(b => b.strength === 'strong') && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={`steam-${i}`}
                        className="absolute bg-white/40 rounded-full animate-[gas-formation_2s_ease-out_infinite]"
                        style={{
                          width: Math.random() * 6 + 3 + 'px',
                          height: Math.random() * 6 + 3 + 'px',
                          left: Math.random() * 40 - 20 + 'px',
                          animationDelay: Math.random() * 1 + 's'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Solution Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Acids:</span>
                  <span>{currentSolution.acids.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bases:</span>
                  <span>{currentSolution.bases.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Chemicals:</span>
                  <span>{currentSolution.acids.length + currentSolution.bases.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>pH Level:</span>
                  <span className={getPHColor(currentSolution.ph)}>
                    {currentSolution.ph.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant="default" className={getPHColor(currentSolution.ph)}>
                    {getPHLabel(currentSolution.ph)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Saved Solutions
              </CardTitle>
              <CardDescription>
                Your saved acid-base solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedSolutions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No saved solutions yet
                </p>
              ) : (
                <div className="space-y-3">
                  {savedSolutions.slice().reverse().slice(0, 10).map((solution, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg cursor-pointer hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
                      onClick={() => loadSolution(solution)}
                    >
                      <div className="font-medium text-sm mb-1">{solution.name}</div>
                      <div className="font-mono text-xs text-muted-foreground mb-1">
                        pH: {solution.ph.toFixed(2)} ({getPHLabel(solution.ph)})
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {solution.acids.length} acids
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {solution.bases.length} bases
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AcidBaseSimulatorPage;
