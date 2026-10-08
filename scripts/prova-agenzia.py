#!/usr/bin/env python3
"""Kit locale EECard: dati sintetici, pacchetti di prova, misure osservate.

Solo libreria standard. Nessuna connessione, autenticazione o servizio reale.
Il confronto riguarda due presentazioni documentali, non il prodotto operativo.
"""

import argparse
import csv
import datetime as dt
import io
import json
import math
from pathlib import Path
import re
import statistics
import sys


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DATA = ROOT / "docs/progetto/prova-agenzia-2026-10-08"
GROUPS = ("nucleo", "estensione", "controllo")
IDENTITY = ("execution_id", "operator_id", "phase", "condition", "set_id",
            "case_id", "pair_id", "group")
NUMBERS = ("active_seconds", "wait_seconds", "corrections", "errors",
           "critical_errors", "helps")
OBSERVATIONS = ("started_at", "finished_at") + NUMBERS + (
    "observed_decision", "selected_evidence_ids")
COLUMNS = IDENTITY + ("status",) + OBSERVATIONS + ("notes",)
STATUSES = ("non_eseguita", "completata", "fallita", "abbandonata")


class KitError(ValueError):
    """Input non valido: nessuna stima va pubblicata."""


def check(condition, message):
    if not condition:
        raise KitError(message)


def string(value, label):
    check(isinstance(value, str) and bool(value.strip()), f"{label}: testo vuoto/non valido")


def strings(value, label, allow_empty=False):
    check(isinstance(value, list), f"{label}: atteso elenco")
    check(allow_empty or bool(value), f"{label}: elenco vuoto")
    for item in value:
        string(item, label)
    check(len(set(value)) == len(value), f"{label}: duplicati")


def require_keys(value, keys, label):
    check(isinstance(value, dict), f"{label}: atteso oggetto")
    check(set(keys) <= value.keys(), f"{label}: campi mancanti {sorted(set(keys) - value.keys())}")


def references():
    paths_text = (ROOT / "docs/progetto/specifiche-2026-10-08/PERCORSI.md").read_text()
    ea_text = (ROOT / "docs/progetto/discussione-2026-10-07/ANALISI_CONVERSAZIONE.md").read_text()
    return {
        "paths": set(re.findall(r"^## (PF\d{2})\b", paths_text, re.M)),
        "criteria": set(re.findall(r"^\| ((?:PF\d{2}|PT)-AC\d{2}) \|", paths_text, re.M)),
        "ea": set(re.findall(r"^#### (EA\d{2})\b", ea_text, re.M)),
    }


def validate_sets(sets, refs=None):
    """Controlla forma, riferimenti, isolamento e equivalenza strutturale A/B."""
    refs = refs or references()
    check(len(sets) == 2, "Servono esattamente i set A e B")
    by_set, identifiers = {}, set()
    for data in sets:
        require_keys(data, ("schema_version", "synthetic", "set_id", "reference_date", "cases"), "set")
        check(type(data["schema_version"]) is int and data["schema_version"] == 1, "schema_version deve essere 1")
        check(data["synthetic"] is True, "synthetic deve essere true")
        sid = data["set_id"]
        check(sid in ("A", "B") and sid not in by_set, "set_id duplicato/non valido")
        try:
            dt.date.fromisoformat(data["reference_date"])
        except (TypeError, ValueError):
            raise KitError(f"Set {sid}: reference_date non valida") from None
        check(isinstance(data["cases"], list) and len(data["cases"]) == 12, f"Set {sid}: servono 12 casi")
        by_set[sid] = {}
        for case in data["cases"]:
            require_keys(case, ("id", "pair_id", "group", "paths", "ea", "criteria", "title", "task", "actor", "context", "evidence", "expected"), f"Set {sid}: caso")
            cid = case["id"]
            check(isinstance(cid, str) and re.fullmatch(sid + r"(?:0[1-9]|1[0-2])", cid), f"Set {sid}: id caso non valido")
            check(cid not in identifiers, f"ID duplicato: {cid}")
            identifiers.add(cid)
            pair = case["pair_id"]
            check(isinstance(pair, str) and re.fullmatch(r"S(?:0[1-9]|1[0-2])", pair), f"{cid}: pair_id non valido")
            check(pair not in by_set[sid], f"{cid}: pair_id duplicato")
            by_set[sid][pair] = case
            check(case["group"] in GROUPS, f"{cid}: gruppo non valido")
            for key in ("title", "task", "context"):
                string(case[key], f"{cid}/{key}")
            for key in ("paths", "ea", "criteria"):
                strings(case[key], f"{cid}/{key}")
                check(set(case[key]) <= refs[key], f"{cid}/{key}: riferimento inesistente {sorted(set(case[key]) - refs[key])}")
            check(all(c.startswith("PT-") or c.split("-")[0] in case["paths"] for c in case["criteria"]), f"{cid}: criterio estraneo ai percorsi indicati")
            require_keys(case["actor"], ("id", "label", "agency_id"), f"{cid}/actor")
            for key in ("id", "label", "agency_id"):
                string(case["actor"][key], f"{cid}/actor/{key}")
            check(isinstance(case["evidence"], list) and bool(case["evidence"]), f"{cid}: evidenze mancanti")
            allowed, denied = set(), set()
            for evidence in case["evidence"]:
                require_keys(evidence, ("id", "title", "agency_id", "visibility", "body"), f"{cid}/evidence")
                for key in ("id", "title", "agency_id", "body"):
                    string(evidence[key], f"{cid}/evidence/{key}")
                eid = evidence["id"]
                check(re.fullmatch(r"[A-Za-z0-9_-]+", eid), f"{cid}: ID evidenza non portabile")
                check(eid not in identifiers, f"ID duplicato: {eid}")
                identifiers.add(eid)
                check(evidence["visibility"] in ("ammessa", "negata"), f"{eid}: visibility non valida")
                check("SINTETICO" in evidence["body"].upper(), f"{eid}: manca la marcatura SINTETICO")
                check(evidence["agency_id"] == case["actor"]["agency_id"] or evidence["visibility"] == "negata", f"{eid}: evidenza di altra agenzia ammessa")
                (allowed if evidence["visibility"] == "ammessa" else denied).add(eid)
            expected = case["expected"]
            require_keys(expected, ("decision", "evidence_ids", "forbidden_evidence_ids", "actions", "critical_errors"), f"{cid}/expected")
            string(expected["decision"], f"{cid}/expected/decision")
            for key in ("evidence_ids", "forbidden_evidence_ids", "actions", "critical_errors"):
                strings(expected[key], f"{cid}/expected/{key}", allow_empty=key.endswith("evidence_ids"))
            check(set(expected["evidence_ids"]) <= allowed, f"{cid}: soluzione usa evidenza assente o negata")
            check(set(expected["forbidden_evidence_ids"]) == denied, f"{cid}: riferimenti negati incoerenti")
    check(set(by_set) == {"A", "B"}, "Servono A e B")
    for pair, a in by_set["A"].items():
        b = by_set["B"][pair]
        for key in ("group", "paths", "ea", "criteria"):
            av, bv = a[key], b[key]
            check((set(av) == set(bv)) if isinstance(av, list) else av == bv, f"{pair}: {key} diverso tra set")
        for visibility in ("ammessa", "negata"):
            check(sum(e["visibility"] == visibility for e in a["evidence"]) == sum(e["visibility"] == visibility for e in b["evidence"]), f"{pair}: carico evidenze {visibility} diverso")
        for key in ("actions", "critical_errors", "evidence_ids"):
            check(len(a["expected"][key]) == len(b["expected"][key]), f"{pair}: numero {key} diverso")
    return by_set


def load_sets(data_dir):
    sets = []
    for sid in ("A", "B"):
        try:
            sets.append(json.loads((Path(data_dir) / f"SET_{sid}.json").read_text(encoding="utf-8")))
        except (OSError, json.JSONDecodeError) as exc:
            raise KitError(f"SET_{sid}.json: {exc}") from exc
    validate_sets(sets)
    return sets


def schedule(sets):
    by_id = {s["set_id"]: s for s in sets}
    result = []
    for operator, phases in (("OP01", (("corrente", "A"), ("proposta", "B"))),
                             ("OP02", (("proposta", "A"), ("corrente", "B")))):
        for phase, (condition, sid) in enumerate(phases, 1):
            for case in sorted(by_id[sid]["cases"], key=lambda c: c["pair_id"]):
                result.append(dict(zip(IDENTITY, (
                    f"{operator}-F{phase}-{case['id']}", operator, str(phase), condition,
                    sid, case["id"], case["pair_id"], case["group"]))))
    return result


def csv_text(columns, rows):
    buffer = io.StringIO(newline="")
    writer = csv.DictWriter(buffer, fieldnames=columns, lineterminator="\n")
    writer.writeheader()
    writer.writerows(rows)
    return buffer.getvalue()


def operator_pack(data, operator, phase, condition):
    lines = [f"# Prova EECard — {operator}, fase {phase}, set {data['set_id']}", "",
             "**Materiale interamente sintetico. Nessun servizio reale.**", "",
             f"Condizione: **{condition} simulata**. Data di riferimento: {data['reference_date']}.", "",
             "L'operatore interpreta l'attore indicato in ciascun caso. Leggere consegna e materiali; "
             "indicare decisione, documenti utilizzabili, azioni e dati mancanti. Le informazioni di "
             "agenzia, mandato, destinatario e periodo presenti nei materiali servono a valutare i permessi.", "",
             "Tutti i materiali sono facsimili pubblici: la loro presenza nel pacchetto non autorizza "
             "l'attore a usarli o condividerli. Qui i permessi si valutano umanamente; nessun controllo "
             "server è implementato. Non contattare nessuno e non immettere dati reali.", "",
             "La condizione corrente presenta i materiali nell'ordine di raccolta del set; "
             "la proposta aggiunge un indice dei titoli per fascicolo, sugli stessi materiali. "
             "L'ordine di raccolta è sintetico: non rappresenta una cronologia reale o misurata. "
             "Non si sta usando l'interfaccia del prototipo EECard.", ""]
    for case in sorted(data["cases"], key=lambda c: c["pair_id"]):
        lines += [f"## {case['id']} — {case['title']}", "",
                  f"Attore: {case['actor']['label']} ({case['actor']['id']}), agenzia {case['actor']['agency_id']}.", "",
                  case["context"], "", "**Consegna:** " + case["task"], ""]
        if condition == "proposta":
            lines += ["### Indice del fascicolo", ""]
            for ev in sorted(case["evidence"], key=lambda e: (e["title"].casefold(), e["id"])):
                lines.append(f"- [{ev['title']} — {ev['id']}](#materiale-{ev['id'].lower()})")
            lines.append("")
        lines += ["### Materiali nell'ordine di raccolta", ""]
        for ev in case["evidence"]:
            lines += [f"<a id=\"materiale-{ev['id'].lower()}\"></a>", "",
                      f"#### {ev['id']} — {ev['title']}", "", f"Agenzia del materiale: {ev['agency_id']}.", "", ev["body"], ""]
    return "\n".join(lines)


def facilitator(sets):
    lines = ["# Guida riservata al facilitatore — prova sintetica", "",
             "**Riservata durante la prova**: contiene le soluzioni dei facsimili pubblici. "
             "Non consegnarla agli operatori prima del termine delle due fasi. "
             "Nessun dato personale o risultato umano è contenuto nel kit iniziale.", "",
             "OP01: fase 1 corrente/A, fase 2 proposta/B. OP02: fase 1 proposta/A, "
             "fase 2 corrente/B. Dodici casi per fase: 48 esecuzioni pianificate.", "",
             "Separare l'esercizio di comprensione assistita dalla prova a tempo; usare "
             "un esempio distinto dai 24 casi. Avviare il timer alla consegna del caso. "
             "Il lavoro attivo include lettura, ricerca, verifica, decisione e correzione; "
             "registrare separatamente attese e lavoro preliminare/setup. Non sostituire "
             "gli operatori con esecuzioni simulate dall'assistente.", "",
             "### Compilazione misure.csv", "",
             "- Conservare tutte le 48 righe e gli identificativi. `non_eseguita` ha tutte le misure vuote.",
             "- `completata`: decisione corretta secondo la griglia, incluso un blocco atteso; "
             "`fallita`: risposta errata; `abbandonata`: interruzione senza risposta conclusiva.",
             "- Compilare `started_at` e `finished_at` in ISO 8601 con fuso (es. `2026-10-08T10:00:00+00:00`).",
             "- `active_seconds` e `wait_seconds`: secondi osservati non negativi. "
             "`corrections`, `errors`, `critical_errors`, `helps`: conteggi interi osservati. "
             "`errors` conta gli errori irrisolti nell'esito finale; `corrections` le correzioni completate "
             "durante il compito; `critical_errors` gli errori critici avvenuti, anche se poi corretti. "
             "Un errore critico impedisce l'esito `completata`. Zero è un'osservazione esplicita; vuoto è dato mancante.",
             "- `observed_decision`: esito effettivo, anche per fallimenti/abbandoni. "
             "`selected_evidence_ids`: ID separati da `;`, oppure `-` se nessuna evidenza selezionata. "
             "Se una fonte negata è usata/condivisa, registrare errore critico e non `completata`.",
             "- `notes`: aiuti, ambiguità, motivi del fallimento/abbandono e contesto delle correzioni; "
             "non inserire nomi di operatori o dati clienti. La correttezza delle azioni richiede revisione umana.",
             "- Salvare misure osservate e costi in una copia locale riservata. "
             "Nel repository pubblico mantenere modelli vuoti o soli aggregati anonimizzati autorizzati.", "",
             "### Interpretazione", "",
             "L'analisi separa nucleo, estensione e controllo, e distingue nel nucleo attivazione PF01 "
             "da recupero PF02/PF05 senza PF01. I sottogruppi non si sommano ai totali. Mostra pianificate, non eseguite, "
             "incomplete, esiti, errori e aiuti. I tempi comparativi usano solo coppie operatore × "
             "scenario corrette in entrambe le condizioni e senza aiuti; ne dichiara il denominatore "
             "e non nasconde gli esclusi. Non prova risparmio generale, disponibilità a pagare, "
             "sicurezza del software o utilità di NFC, firma e AI. Due presentazioni di documenti "
             "non sono un collaudo del frontend. I set bilanciano la struttura; difficoltà e familiarità "
             "vanno riesaminate con persone prima di interpretare il confronto.", "",
             "Il file costi.csv resta vuoto nei valori: costo orario aggregato per ruolo, consumi, "
             "setup, software/supporto e hardware richiedono fonti e orizzonte espliciti. "
             "Non assumere salari, prezzi o volumi. Nessun calcolo economico è automatico.", ""]
    for data in sets:
        lines += [f"## Soluzioni set {data['set_id']}", ""]
        for case in sorted(data["cases"], key=lambda c: c["pair_id"]):
            expected = case["expected"]
            lines += [f"### {case['id']} / {case['pair_id']} — {case['group']}", "",
                      f"Tracciabilità: {', '.join(case['paths'] + case['ea'] + case['criteria'])}.", "",
                      "Decisione attesa: " + expected["decision"], "",
                      "Evidenze richieste: " + (", ".join(expected["evidence_ids"]) or "nessuna") + ".", "",
                      "Evidenze negate: " + (", ".join(expected["forbidden_evidence_ids"]) or "nessuna") + ".", "",
                      "Azioni attese:", ""]
            lines.extend("- " + action for action in expected["actions"])
            lines += ["", "Errori critici:", ""]
            lines.extend("- " + error for error in expected["critical_errors"])
            lines.append("")
    return "\n".join(lines)


def prepare(sets, output):
    validate_sets(sets)
    output = Path(output)
    files = {}
    by_id = {s["set_id"]: s for s in sets}
    planned = schedule(sets)
    for row in planned:
        name = f"{row['operator_id']}_FASE{row['phase']}_{row['condition']}_{row['set_id']}.md"
        if name not in files:
            files[name] = operator_pack(by_id[row["set_id"]], row["operator_id"], row["phase"], row["condition"])
    files["facilitatore.md"] = facilitator(sets)
    files["misure.csv"] = csv_text(COLUMNS, [dict(row, status="non_eseguita") for row in planned])
    cost_columns = ("category", "role_or_item", "quantity", "unit", "unit_cost", "currency", "period_or_horizon", "source", "notes")
    files["costi.csv"] = csv_text(cost_columns, [
        {"category": category} for category in ("lavoro_ricorrente", "consumi", "setup", "software_supporto", "hardware")])
    check(not any((output / name).exists() for name in files), "Output già presente: usare una cartella nuova; le misure non vengono sovrascritte")
    output.mkdir(parents=True, exist_ok=True)
    for name, content in files.items():
        # Modalità esclusiva: anche un'altra esecuzione non sovrascrive osservazioni.
        with (output / name).open("x", encoding="utf-8", newline="") as handle:
            handle.write(content)
    return sorted(files)


def timestamp(value, label):
    try:
        parsed = dt.datetime.fromisoformat(value.replace("Z", "+00:00"))
        check(parsed.tzinfo is not None and parsed.utcoffset() is not None, f"{label}: manca il fuso orario")
        return parsed
    except ValueError as exc:
        raise KitError(f"{label}: timestamp non valido") from exc


def analyze(sets, measurements):
    validate_sets(sets)
    planned = {row["execution_id"]: row for row in schedule(sets)}
    cases = {case["id"]: case for data in sets for case in data["cases"]}
    with Path(measurements).open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        check(reader.fieldnames is not None and len(reader.fieldnames) == len(set(reader.fieldnames)) and set(reader.fieldnames) == set(COLUMNS), "Intestazione CSV non valida")
        rows = list(reader)
    seen, processed = set(), []
    for row in rows:
        check(None not in row and all(value is not None for value in row.values()), "Riga CSV con numero campi errato")
        row = {key: value.strip() for key, value in row.items()}
        eid = row["execution_id"]
        check(eid in planned and eid not in seen, f"Esecuzione sconosciuta/duplicata: {eid}")
        seen.add(eid)
        check(all(row[key] == planned[eid][key] for key in IDENTITY), f"{eid}: identificativi pianificati alterati")
        check(row["status"] in STATUSES, f"{eid}: status non valido")
        row["missing"] = []
        if row["status"] == "non_eseguita":
            check(not any(row[key] for key in OBSERVATIONS), f"{eid}: non_eseguita contiene misure")
            row["complete"] = False
            processed.append(row)
            continue
        for field in OBSERVATIONS:
            if not row[field]:
                row["missing"].append(field)
        for field in NUMBERS:
            if row[field]:
                try:
                    number = float(row[field])
                except ValueError as exc:
                    raise KitError(f"{eid}/{field}: numero non valido") from exc
                check(math.isfinite(number) and number >= 0, f"{eid}/{field}: numero negativo/non finito")
                check(field.endswith("seconds") or number.is_integer(), f"{eid}/{field}: atteso conteggio intero")
                row[field] = number
        for field in ("started_at", "finished_at"):
            if row[field]:
                row[field] = timestamp(row[field], f"{eid}/{field}")
        if row["started_at"] and row["finished_at"]:
            check(row["finished_at"] >= row["started_at"], f"{eid}: fine precedente all'inizio")
            if row["active_seconds"] != "" and row["wait_seconds"] != "":
                elapsed = (row["finished_at"] - row["started_at"]).total_seconds()
                check(row["active_seconds"] + row["wait_seconds"] <= elapsed + 1,
                      f"{eid}: lavoro attivo e attesa superano la durata osservata (tolleranza 1 s)")
        if row["status"] == "completata" and row["critical_errors"] != "":
            check(row["critical_errors"] == 0, f"{eid}: completata con errore critico")
        if row["status"] == "completata" and row["errors"] != "":
            check(row["errors"] == 0, f"{eid}: completata con errori nell'esito finale")
        selected = row["selected_evidence_ids"]
        if selected:
            selected_ids = [] if selected == "-" else selected.split(";")
            check(len(set(selected_ids)) == len(selected_ids), f"{eid}: evidenze selezionate duplicate")
            case = cases[row["case_id"]]
            check(set(selected_ids) <= {e["id"] for e in case["evidence"]}, f"{eid}: evidenza selezionata inesistente")
            if set(selected_ids) & set(case["expected"]["forbidden_evidence_ids"]):
                check(row["status"] != "completata" and row["critical_errors"] != "" and row["critical_errors"] >= 1, f"{eid}: fonte negata usata senza esito critico coerente")
        row["complete"] = not row["missing"]
        processed.append(row)
    check(seen == set(planned), f"Mancano {len(set(planned) - seen)} righe pianificate: ripristinarle anche se non eseguite")
    report = {"planned": len(processed), "observed": sum(r["status"] != "non_eseguita" for r in processed),
              "incomplete": [{"execution_id": r["execution_id"], "missing": r["missing"]} for r in processed if r["missing"]],
              "groups": [], "comparisons": []}
    scopes = [(group, {cid for cid, case in cases.items() if case["group"] == group}) for group in GROUPS]
    scopes += [
        ("nucleo:attivazione_PF01", {cid for cid, case in cases.items() if case["group"] == "nucleo" and "PF01" in case["paths"]}),
        ("nucleo:recupero_PF02_PF05_senza_PF01", {cid for cid, case in cases.items() if case["group"] == "nucleo" and "PF01" not in case["paths"] and set(case["paths"]) & {"PF02", "PF05"}}),
    ]
    for group, case_ids in scopes:
        for condition in ("corrente", "proposta"):
            relevant = [r for r in processed if r["case_id"] in case_ids and r["condition"] == condition]
            observed = [r for r in relevant if r["status"] != "non_eseguita"]
            complete = [r for r in observed if r["complete"]]
            item = {"group": group, "condition": condition, "planned": len(relevant), "observed": len(observed), "complete": len(complete),
                    "incomplete": len(observed) - len(complete), "unperformed": len(relevant) - len(observed)}
            for status in ("completata", "fallita", "abbandonata"):
                item[status] = sum(r["status"] == status for r in observed)
            item["correct_unassisted"] = sum(r["status"] == "completata" and r["helps"] == 0 for r in complete)
            for field in ("corrections", "errors", "critical_errors", "helps"):
                measured = [r[field] for r in observed if r[field] != ""]
                item[field] = {"sum": sum(measured) if measured else None, "denominator": len(measured)}
            item["active_seconds_max"] = max((r["active_seconds"] for r in observed if r["active_seconds"] != ""), default=None)
            report["groups"].append(item)
        pairs = {}
        for row in processed:
            if row["case_id"] in case_ids:
                pairs.setdefault((row["operator_id"], row["pair_id"]), {})[row["condition"]] = row
        matched = [(key, values) for key, values in pairs.items()
                   if all(r["complete"] and r["status"] == "completata" and r["helps"] == 0 for r in values.values())]
        comparison = {"group": group, "planned_pairs": len(pairs), "matched_pairs": len(matched),
                      "excluded_pairs": len(pairs) - len(matched), "pair_ids": ["/".join(key) for key, _ in matched],
                      "current_median": None, "proposed_median": None, "difference_median": None}
        if matched:
            comparison.update(current_median=statistics.median(v["corrente"]["active_seconds"] for _, v in matched),
                              proposed_median=statistics.median(v["proposta"]["active_seconds"] for _, v in matched),
                              difference_median=statistics.median(v["corrente"]["active_seconds"] - v["proposta"]["active_seconds"] for _, v in matched))
        report["comparisons"].append(comparison)
    return report


def render_report(report):
    lines = ["Prova EECard — analisi descrittiva di osservazioni dichiarate", "",
             f"Esecuzioni pianificate: {report['planned']}; con osservazioni: {report['observed']}; "
             f"con campi mancanti: {len(report['incomplete'])}."]
    if not report["observed"]:
        lines += ["Nessuna misura osservata. Successo, tempi, risparmio e costi non stimabili."]
        return "\n".join(lines)
    lines += ["I conteggi degli esiti includono le righe incomplete; tempi appaiati solo da righe complete. "
              "I sottogruppi attivazione/recupero sono dettagli del nucleo e non vanno sommati al totale. "
              "La soglia proposta del recupero non si applica al nucleo aggregato.", ""]
    for group in report["groups"]:
        def metric(name):
            value = group[name]
            return f"{value['sum']:g}/{value['denominator']}" if value["denominator"] else "non osservati/0"
        lines += [f"{group['group']} / {group['condition']}: {group['observed']}/{group['planned']} eseguite; "
                  f"{group['unperformed']} non eseguite; {group['incomplete']} incomplete. "
                  f"Esiti dichiarati: {group['completata']} corrette, {group['fallita']} fallite, {group['abbandonata']} abbandonate.",
                  f"  Corrette senza aiuto e con misure complete: {group['correct_unassisted']}/{group['observed']} osservate "
                  f"(pianificate {group['planned']}). Errori/totale righe misurate: {metric('errors')}; "
                  f"critici: {metric('critical_errors')}; aiuti: {metric('helps')}; correzioni: {metric('corrections')}.",
                  "  Massimo lavoro attivo, inclusi esiti falliti/abbandonati: " +
                  (f"{group['active_seconds_max']:g} s." if group['active_seconds_max'] is not None else "non osservato.")]
    for item in report["comparisons"]:
        lines += ["", f"Confronto {item['group']}: {item['matched_pairs']}/{item['planned_pairs']} coppie operatore × scenario "
                  f"corrette, complete e senza aiuti; escluse dal tempo appaiato {item['excluded_pairs']}."]
        if item["matched_pairs"]:
            lines += [f"  Mediane lavoro attivo nello stesso sottocampione: corrente {item['current_median']:g} s; "
                      f"proposta {item['proposed_median']:g} s; mediana differenze (corrente − proposta) {item['difference_median']:g} s.",
                      "  Coppie incluse: " + ", ".join(item["pair_ids"]) + "."]
        else:
            lines.append("  Nessuna coppia comparabile: mediana non stimabile.")
    if report["incomplete"]:
        lines += ["", "Misure incomplete da integrare, senza sostituire i vuoti con zero:"]
        lines.extend(f"- {item['execution_id']}: {', '.join(item['missing'])}" for item in report["incomplete"])
    lines += ["", "Le differenze nel sottocampione riuscito non dimostrano un risparmio complessivo: "
              "valutare anche fallimenti, aiuti, attese, setup e lavoro di preparazione. "
              "Nessuna soglia commerciale, hardware, sicurezza server o disponibilità a pagare è validata. "
              "Costi non calcolati: servono dati aggregati e fonti esplicite."]
    return "\n".join(lines)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    for command in ("validate", "prepare", "analyze"):
        command_parser = sub.add_parser(command)
        command_parser.add_argument("--data-dir", type=Path, default=DEFAULT_DATA)
        if command == "prepare":
            command_parser.add_argument("--output", type=Path, required=True)
        if command == "analyze":
            command_parser.add_argument("--measurements", type=Path, required=True)
    args = parser.parse_args(argv)
    try:
        sets = load_sets(args.data_dir)
        if args.command == "validate":
            print("Validi: 24 casi, 12 coppie A/B, riferimenti EA/PF/criteri e isolamento strutturale. "
                  "Difficoltà sostanziale e correttezza delle decisioni richiedono revisione umana.")
        elif args.command == "prepare":
            files = prepare(sets, args.output)
            print(f"Creati {len(files)} file in {args.output}; 48 esecuzioni non_eseguita, nessuna misura inventata.")
            for name in files:
                print(name)
        else:
            print(render_report(analyze(sets, args.measurements)))
    except (KitError, OSError) as exc:
        print(f"Errore: {exc}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
