import Alert from "@/app/models/alert";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const options = [
    new Alert("⚠️", "Temps d’attente élevé sur la file principale (>10 min)"),
    new Alert("🚨", "SLA critique dépassé — intervention requise"),
    new Alert("👥", "Pénurie d’agents qualifiés pour le canal Chat"),
    new Alert("📈", "Pic d’appels en cours — files en augmentation rapide"),
    new Alert("📉", "Taux d’abandon élevé (>20%) sur la file Voix"),
    new Alert("🔌", "Agent(s) hors ligne inattendu(s) — vérifier la connexion"),
    new Alert("🔔", "Rappel en retard — plusieurs callbacks en attente"),
    new Alert("🛠️", "Maintenance planifiée dans 30 min"),
    new Alert("❌", "Interruption de service détectée sur le canal Email"),
    new Alert("👩‍💼", "Superviseur demandé sur la file VIP"),
    new Alert("⚙️", "Échec d’authentification répété pour plusieurs agents"),
    new Alert("📚", "Nouveau tutoriel recommandé — augmentation des erreurs opérateur"),
  ];

  const count = Math.floor(Math.random() * 4);
  const selected = options
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map(a => a.toJSON());

  return NextResponse.json(selected);
}