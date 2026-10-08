#!/usr/bin/env python3
"""Prove del kit: impedire misure inventate e confronti che occultano fallimenti."""

import copy
import csv
import importlib.util
from pathlib import Path
import tempfile
import unittest


SPEC = importlib.util.spec_from_file_location("prova_agenzia", Path(__file__).with_name("prova-agenzia.py"))
KIT = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(KIT)


def sample_sets():
    """Fixture solo tecnica, distinta dagli scenari destinati agli operatori."""
    result = []
    for sid in ("A", "B"):
        cases = []
        for i in range(1, 13):
            cid = f"{sid}{i:02d}"
            allowed, denied = f"{cid}-doc", f"{cid}-private"
            cases.append({
                "id": cid, "pair_id": f"S{i:02d}", "group": "nucleo" if i < 9 else ("estensione" if i < 12 else "controllo"),
                "paths": ["PF02"], "ea": ["EA08"], "criteria": ["PF02-AC01"],
                "title": "Caso tecnico", "task": "Selezionare il documento pertinente", "context": "Mandato verificato nell'agenzia AG01",
                "actor": {"id": "ACT01", "label": "Operatore sintetico", "agency_id": "AG01"},
                "evidence": [
                    {"id": allowed, "title": "Documento di prova", "agency_id": "AG01", "visibility": "ammessa", "body": "SINTETICO. Mandato valido, anno 2000."},
                    {"id": denied, "title": "Materiale estraneo", "agency_id": "AG02", "visibility": "negata", "body": "SINTETICO. Agenzia diversa senza mandato."}],
                "expected": {"decision": "Usare il documento pertinente", "evidence_ids": [allowed], "forbidden_evidence_ids": [denied],
                             "actions": ["Confermare la provenienza"], "critical_errors": ["Divulgare il materiale estraneo"]}})
        result.append({"schema_version": 1, "synthetic": True, "set_id": sid, "reference_date": "2026-10-08", "cases": cases})
    return result


class KitTests(unittest.TestCase):
    def setUp(self):
        self.sets = sample_sets()
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.output = Path(self.temp.name) / "output"

    def generated_rows(self):
        KIT.prepare(self.sets, self.output)
        with (self.output / "misure.csv").open(newline="") as handle:
            return list(csv.DictReader(handle))

    def report(self, rows):
        path = Path(self.temp.name) / "observations.csv"
        path.write_text(KIT.csv_text(KIT.COLUMNS, rows))
        return KIT.analyze(self.sets, path)

    def observed(self, row, status="completata", seconds="100"):
        row.update(status=status, started_at="2026-10-08T10:00:00Z", finished_at="2026-10-08T10:10:00Z",
                   active_seconds=seconds, wait_seconds="0", corrections="0", errors="0", critical_errors="0", helps="0",
                   observed_decision="Decisione sintetica osservata", selected_evidence_ids=f"{row['case_id']}-doc")
        return row

    def test_valid_schema_and_real_repository_references(self):
        KIT.validate_sets(self.sets)
        actual_dir = KIT.DEFAULT_DATA
        if all((actual_dir / f"SET_{sid}.json").exists() for sid in ("A", "B")):
            actual = KIT.load_sets(actual_dir)
            self.assertEqual(24, sum(len(item["cases"]) for item in actual))

    def test_rejects_malformed_root_and_case(self):
        for mutate in (
            lambda data: data[0].update(synthetic=False),
            lambda data: data[0].update(schema_version=True),
            lambda data: data[0]["cases"].pop(),
            lambda data: data[0]["cases"][0].pop("actor"),
            lambda data: data[0]["cases"][0].update(criteria=["PF02-AC99"]),
            lambda data: data[0]["cases"][0].update(paths=["PF05"]),
        ):
            with self.subTest(mutate=mutate):
                data = copy.deepcopy(self.sets)
                mutate(data)
                with self.assertRaises(KIT.KitError):
                    KIT.validate_sets(data)

    def test_rejects_crossagency_access_and_inconsistent_evidence(self):
        for mutate in (
            lambda case: case["evidence"][0].update(agency_id="AG02"),
            lambda case: case["expected"].update(evidence_ids=["A01-private"]),
            lambda case: case["expected"].update(forbidden_evidence_ids=[]),
            lambda case: case["expected"].update(evidence_ids=["missing"]),
            lambda case: case["evidence"][0].update(body="Documento senza marcatura"),
        ):
            data = copy.deepcopy(self.sets)
            mutate(data[0]["cases"][0])
            with self.assertRaises(KIT.KitError):
                KIT.validate_sets(data)

    def test_rejects_duplicate_ids_and_unbalanced_pairs(self):
        data = copy.deepcopy(self.sets)
        data[0]["cases"][1]["evidence"][0]["id"] = "A01-doc"
        with self.assertRaises(KIT.KitError):
            KIT.validate_sets(data)
        data = copy.deepcopy(self.sets)
        data[1]["cases"][0]["group"] = "controllo"
        with self.assertRaises(KIT.KitError):
            KIT.validate_sets(data)

    def test_prepare_has_48_unobserved_counterbalanced_executions(self):
        rows = self.generated_rows()
        self.assertEqual(48, len(rows))
        self.assertEqual({"non_eseguita"}, {r["status"] for r in rows})
        self.assertTrue(all(not r[key] for r in rows for key in KIT.OBSERVATIONS))
        self.assertEqual({("OP01", "1", "corrente", "A"), ("OP01", "2", "proposta", "B"),
                          ("OP02", "1", "proposta", "A"), ("OP02", "2", "corrente", "B")},
                         {(r["operator_id"], r["phase"], r["condition"], r["set_id"]) for r in rows})

    def test_operator_pack_retains_permission_evidence_without_answers(self):
        KIT.prepare(self.sets, self.output)
        for name in ("OP01_FASE1_corrente_A.md", "OP02_FASE1_proposta_A.md"):
            content = (self.output / name).read_text()
            self.assertIn("Agenzia diversa senza mandato", content)
            self.assertIn("A01-private", content)
            for hidden in ("PF02-AC01", "EA08", "Divulgare il materiale estraneo", "visibility", "Decisione attesa"):
                self.assertNotIn(hidden, content)
        self.assertNotIn("### Indice del fascicolo", (self.output / "OP01_FASE1_corrente_A.md").read_text())
        self.assertIn("### Indice del fascicolo", (self.output / "OP02_FASE1_proposta_A.md").read_text())
        self.assertIn("Divulgare il materiale estraneo", (self.output / "facilitatore.md").read_text())

    def test_prepare_never_overwrites_observations(self):
        self.generated_rows()
        path = self.output / "misure.csv"
        path.write_text("OSSERVAZIONE DA CONSERVARE")
        with self.assertRaises(KIT.KitError):
            KIT.prepare(self.sets, self.output)
        self.assertEqual("OSSERVAZIONE DA CONSERVARE", path.read_text())

    def test_unperformed_data_cannot_produce_fake_medians_or_success_rates(self):
        report = self.report(self.generated_rows())
        self.assertEqual(0, report["observed"])
        self.assertTrue(all(r["current_median"] is None for r in report["comparisons"]))
        text = KIT.render_report(report)
        self.assertIn("Nessuna misura osservata", text)
        self.assertNotIn("0%", text)
        self.assertNotIn("0 s", text)

    def test_incomplete_observations_are_visible_and_never_imputed(self):
        rows = self.generated_rows()
        self.observed(rows[0])
        rows[0]["active_seconds"] = ""
        self.observed(rows[12])
        report = self.report(rows)
        self.assertEqual(2, report["observed"])
        self.assertEqual(["active_seconds"], report["incomplete"][0]["missing"])
        self.assertEqual(0, report["comparisons"][0]["matched_pairs"])
        self.assertIn("active_seconds", KIT.render_report(report))

    def test_rejects_invalid_numeric_counts_and_incoherent_outcomes(self):
        base = self.generated_rows()
        for field, value in (("active_seconds", "-1"), ("wait_seconds", "NaN"), ("errors", "inf"),
                             ("corrections", "0.5"), ("helps", "abc"), ("critical_errors", "1"), ("errors", "1")):
            with self.subTest(field=field, value=value):
                rows = copy.deepcopy(base)
                self.observed(rows[0])
                rows[0][field] = value
                with self.assertRaises(KIT.KitError):
                    self.report(rows)

    def test_rejects_missing_rows_changed_identifiers_and_unperformed_values(self):
        base = self.generated_rows()
        for mutate in (lambda rows: rows.pop(), lambda rows: rows[0].update(group="controllo"),
                       lambda rows: rows[0].update(active_seconds="0"), lambda rows: rows.append(rows[0])):
            rows = copy.deepcopy(base)
            mutate(rows)
            with self.assertRaises(KIT.KitError):
                self.report(rows)

    def test_failed_and_abandoned_cases_are_retained_in_denominators(self):
        rows = self.generated_rows()
        self.observed(rows[0], seconds="120")
        self.observed(rows[12], seconds="60")
        self.observed(rows[1], status="fallita", seconds="200")
        rows[1].update(errors="1", critical_errors="1", selected_evidence_ids="A02-private")
        self.observed(rows[13], status="abbandonata", seconds="180")
        report = self.report(rows)
        current, proposed = report["groups"][:2]
        self.assertEqual((2, 16, 1), (current["observed"], current["planned"], current["fallita"]))
        self.assertEqual(1, proposed["abbandonata"])
        self.assertEqual({"sum": 1, "denominator": 2}, current["critical_errors"])
        self.assertEqual(200, current["active_seconds_max"])
        paired = report["comparisons"][0]
        self.assertEqual((1, 16, 15), (paired["matched_pairs"], paired["planned_pairs"], paired["excluded_pairs"]))
        self.assertEqual(60, paired["difference_median"])
        self.assertIn("non dimostrano un risparmio complessivo", KIT.render_report(report))

    def test_assisted_success_does_not_enter_unassisted_comparison(self):
        rows = self.generated_rows()
        self.observed(rows[0])
        self.observed(rows[12])
        rows[12]["helps"] = "1"
        report = self.report(rows)
        self.assertEqual(0, report["comparisons"][0]["matched_pairs"])
        self.assertEqual(1, report["groups"][1]["helps"]["sum"])

    def test_explicit_observed_zero_is_a_measurement(self):
        rows = self.generated_rows()
        self.observed(rows[0], seconds="0")
        self.observed(rows[12], seconds="0")
        report = self.report(rows)
        self.assertEqual(0, report["comparisons"][0]["current_median"])
        self.assertEqual([], report["incomplete"])

    def test_permission_violation_cannot_be_called_success(self):
        rows = self.generated_rows()
        self.observed(rows[0])
        rows[0]["selected_evidence_ids"] = "A01-private"
        with self.assertRaises(KIT.KitError):
            self.report(rows)

    def test_observed_duration_cannot_be_shorter_than_measured_work(self):
        rows = self.generated_rows()
        self.observed(rows[0], seconds="3600")
        with self.assertRaisesRegex(KIT.KitError, "durata osservata"):
            self.report(rows)
        rows[0]["active_seconds"] = "600"
        rows[0]["wait_seconds"] = "2"
        with self.assertRaises(KIT.KitError):
            self.report(rows)
        rows[0]["wait_seconds"] = "1"
        self.assertEqual(1, self.report(rows)["observed"])

    def test_activation_does_not_inflate_recovery_sample(self):
        for data in self.sets:
            data["cases"][0].update(paths=["PF01"], criteria=["PF01-AC01"])
        rows = self.generated_rows()
        for i in (0, 1, 12, 13):
            self.observed(rows[i])
        comparisons = {item["group"]: item for item in self.report(rows)["comparisons"]}
        self.assertEqual(2, comparisons["nucleo"]["matched_pairs"])
        self.assertEqual(1, comparisons["nucleo:attivazione_PF01"]["matched_pairs"])
        self.assertEqual(1, comparisons["nucleo:recupero_PF02_PF05_senza_PF01"]["matched_pairs"])

    def test_critical_error_remains_even_if_corrected_before_final_answer(self):
        rows = self.generated_rows()
        self.observed(rows[0], status="fallita")
        rows[0].update(errors="0", critical_errors="1", corrections="1")
        report = self.report(rows)
        self.assertEqual(1, report["groups"][0]["critical_errors"]["sum"])
        self.assertEqual(1, report["groups"][0]["fallita"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
