import { StringUtils } from "@/core/utils/string.utils";

export class DateUtils {
	public static getDayName(): string {
		const today = new Date();
		const day = today.toLocaleDateString("pt-BR", { weekday: "long", timeZone: "America/Sao_Paulo" });
		return StringUtils.capitalize(day);
	}

	public static getCurrentTime(): string {
		return new Intl.DateTimeFormat("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			timeZone: "America/Sao_Paulo"
		}).format(new Date());
	}
}
